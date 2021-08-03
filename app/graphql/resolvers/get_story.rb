module Resolvers
  class GetStory < Base
    type Types::StoryType, null: true
    description 'Get story information'

    argument :id, ID, required: true

    def resolve(id:)
      Story.find_by_hashid!(id)
    end
  end
end

