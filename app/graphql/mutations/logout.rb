module Mutations
  class Logout < SimpleMutation
    null true

    description 'Destroy current session'

    field :success, Boolean, null: true
    field :errors, [String], null: false

    def resolve
      context[:sign_out].call(current_user)
      context[:current_session]&.destroy

      {
        success: true,
        errors: []
      }
    end
  end
end