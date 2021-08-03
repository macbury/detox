module Mutations
  class MarkStories < BaseMutation
    use Triggers::UpdatedStories, as: :trigger_updated_stories
    null true
    description 'Update multiple stories state for reading, is favorite etc.'

    argument :ids, [ID], required: true, description: 'Story ids'
    argument :is_read, Boolean, required: false

    field :stories, [Types::StoryType], null: true
    field :errors, [String], null: false

    def resolve(ids:, **args)
      story_ids = ids.map { |id| Story.decode_id(id) }

      authorize! Story, to: :mark_as?
      stories = authorized_scope(Story.where(id: story_ids))

      ActiveRecord::Base.transaction do
        stories.find_in_batches do |group|
          group.each { |story| story.update(**args) }
          trigger_updated_stories(user: current_user, stories: group)
        end
      end

      {
        stories: stories,
        errors: []
      }
    end
  end
end
