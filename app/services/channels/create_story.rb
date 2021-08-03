module Channels
  # Create story and its attachment from entry metadata
  class CreateStory < Service
    use Proxy::ResolveUrl, as: :resolve_url
    use Extract::Summary, as: :extract_summary
    use BuildAttachment, as: :build_attachment

    def initialize(channel:, entry_metadata:)
      @channel = channel
      @entry_metadata = entry_metadata
    end

    attr_reader :channel, :entry_metadata, :story

    def call
      return if channel.stories.exists?(guid: entry_metadata.guid)

      # do this outside of transaction, to speed up everything, there is no point to wait for attachments to be downloaded inside database transaction
      @story_attrs = build_story_attrs

      # this will also save the attachment, so it is better to do this in transaction
      Story.transaction do
        channel.stories.create!(@story_attrs)
      end
    rescue ActiveRecord::RecordInvalid => e
      error "Could not save: #{entry_metadata} because: #{e}"
    end

    private

    def build_story_attrs
      {
        title: entry_metadata.title,
        permalink: permalink,
        attachment: attachment,
        summary: summary,
        published_at: entry_metadata.published_at,
        view_at: view_at,
        guid: entry_metadata.guid
      }
    end

    def permalink
      @permalink ||= channel.youtube? ? entry_metadata.permalink : resolve_url(entry_metadata.permalink)
    end

    def attachment
      @attachment ||= build_attachment(
        entry_metadata: entry_metadata,
        channel: channel
      )
    end

    def summary
      text = extract_summary(entry_metadata.body)

      if text.empty? && attachment.respond_to?(:body)
        extract_summary(attachment.body)
      else
        text
      end
    end

    def view_at
      @view_at ||= [entry_metadata.published_at, Time.zone.now].max
    end
  end
end