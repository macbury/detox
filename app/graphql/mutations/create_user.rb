module Mutations
  class CreateUser < BaseMutation
    null true
    description 'Create new user'

    argument :username, String, required: true
    argument :password, String, required: true

    field :user, Types::UserType, null: true
    field :errors, [String], null: true

    def resolve(...)
      authorize! User, to: :create?

      {
        user: User.create!(...)
      }
    end
  end
end
