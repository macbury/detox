module Mutations
  class UpdateStory < BaseMutation
    use Triggers::UpdatedStories, as: :trigger_updated_stories
    null true
    description 'Update story state for reading, is favorite etc.'

    argument :id, ID, required: true, description: 'Story id'
    argument :is_read, Boolean, required: false
    argument :is_favorite, Boolean, required: false

    field :story, Types::StoryType, null: true
    field :errors, [String], null: true

    def resolve(id:, **args)
      story = Story.find_by_hashid!(id)
      authorize! story, to: :update?

      story.update!(args)

      trigger_updated_stories(user: current_user, stories: [story])

      {
        story: story
      }
    end
  end
end
