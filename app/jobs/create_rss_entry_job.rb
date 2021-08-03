class CreateRssEntryJob < ApplicationJob
  retry_on ServiceFailure, wait: 1.minute, attempts: 3

  use Channels::Rss::BuildEntry, as: :build_entry
  use Channels::CreateStory, as: :create_story
  use Triggers::NewStories, as: :trigger_new_stories

  def perform(channel_id, serialized_feed_entry, _kind)
    @channel = Channel.find(channel_id)
    feed_entry = YAML.load(serialized_feed_entry)

    return if @channel.stories.exists?(guid: feed_entry.id)

    entry_metadata = build_entry(
      entry: feed_entry,
      channel: @channel
    )

    story = create_story(
      channel: @channel,
      entry_metadata: entry_metadata
    )

    trigger_new_stories(user: @channel.user, stories: [story])
  rescue ServiceFailure => error
    @channel&.update!(
      status: :error,
      error: error
    )
    raise error
  end

  def lock_key(channel_id, serialized_feed_entry, _kind)
    feed_entry = YAML.load(serialized_feed_entry)

    "CreateRssEntryJob:#{channel_id}:#{feed_entry.id}"
  end

  def throttle_key(channel_id, _serialized_feed_entry, kind)
    return "CreateRssEntryJob:#{channel_id}" unless kind.inquiry.youtube?

    "CreateRssEntryJob:#{kind}"
  end

  def timeout_after
    10.minutes
  end
end