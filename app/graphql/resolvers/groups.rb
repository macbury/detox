module Resolvers
  class Groups < Base
    include SearchObject.module(:graphql)

    description 'Lists user groups'
    scope do
      authorized_scope(Group.order('name'))
    end

    type [Types::GroupType], null: false
  end
end