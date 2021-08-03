module Mutations
  class UpdatePlayback < BaseMutation
    use Triggers::UpdatedStories, as: :trigger_updated_stories
    use Triggers::PlaybackUpdated, as: :trigger_playback_updated
    use Playbacks::Control, as: :control_playback!

    null true
    description 'Update playback status for story'

    argument :id, ID, required: true, description: 'Story id'
    argument :position, Float, required: false
    argument :is_playing, Boolean, required: false
    argument :duration, Float, required: false

    field :story, Types::StoryType, null: true
    field :errors, [String], null: true

    def resolve(id:, **args)
      story = Story.find_by_hashid!(id)

      authorize! story, to: :control_playback?

      control_playback!(story: story, **args)
      story = story.reload

      trigger_updated_stories(user: current_user, stories: [story])
      trigger_playback_updated(user: current_user, story: story)

      {
        story: story
      }
    end
  end
end
