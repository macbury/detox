module Mutations
  class UpdateUser < BaseMutation
    null true
    description 'Update user settings'

    argument :id, ID, required: true
    argument :username, String, required: false
    argument :status, Types::UserStatusType, required: false

    field :user, Types::UserType, null: true
    field :errors, [String], null: true

    def resolve(id:, **args)
      user = User.find(id)
      authorize! user, to: :update?

      user.update!(args)

      {
        user: user
      }
    end
  end
end
