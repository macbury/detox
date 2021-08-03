module Resolvers
  class GetGroup < Base
    type Types::GroupType, null: true
    description 'Get group information'

    argument :id, ID, required: true

    def resolve(id:)
      current_user.groups.find(id)
    end
  end
end

