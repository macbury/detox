module Resolvers
  class GetChannel < Base
    type Types::ChannelType, null: true
    description 'Find channel by its id'

    argument :id, ID, required: true

    def resolve(id:)
      current_user.channels.find(id)
    end
  end
end

