module Resolvers
  class GetVideo < Base
    type Types::VideoType, null: true
    description 'Get video content'

    argument :id, ID, required: true

    def resolve(id:)
      Story.find(id)
    end
  end
end

