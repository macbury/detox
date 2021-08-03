module Mutations
  class Snooze < BaseMutation
    null true
    description 'Snooze story to be read readed in near future'

    argument :id, ID, required: true, description: 'Story id'

    field :story, Types::StoryType, null: true
    field :errors, [String], null: true

    def resolve(id:)
      story = Story.find_by_hashid!(id)
      authorize! story, to: :snooze?

      story.update!(
        is_read: false,
        view_at: 2.hours.from_now # TODO: depending of time of day snooze for different time
      )

      {
        story: story
      }
    end
  end
end
