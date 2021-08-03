module Resolvers
  class Users < Base
    include SearchObject.module(:graphql)

    description 'Lists all users in system'

    scope do
      User.all
    end

    type Types::UserType.connection_type, null: false
  end
end