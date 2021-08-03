module Mutations
  class UpdatePassword < BaseMutation
    null true
    description 'Update current user password'

    argument :current_password, String, required: true
    argument :password, String, required: true
    argument :password_confirmation, String, required: true

    field :success, Boolean, null: true
    field :errors, [String], null: true

    def resolve(current_password:, password:, password_confirmation:)
      authorize! current_user, to: :change_password?

      success = current_user.update_with_password(
        current_password: current_password,
        password: password,
        password_confirmation: password_confirmation
      )

      {
        success: success,
        errors: current_user.errors.full_messages
      }
    end
  end
end
