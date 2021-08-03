module Mutations
  class SignIn < BaseMutation
    description 'Create new session with ability to interact with other api'
    null true

    argument :username, String, required: true
    argument :password, String, required: true
    argument :name, String, required: true
    argument :public_key, Types::PemKeyArgument, required: true

    field :errors, [String], null: false
    field :session, Types::SessionType, null: true

    def resolve(username:, password:, name:, public_key:)
      cleanup_session

      user = User.find_for_authentication(username: username)

      session_arguments = {
        name: name,
        ip: context[:ip],
        public_key: public_key&.to_pem
      }

      session = user&.valid_password?(password) ? user.sessions.create!(session_arguments) : nil

      context[:sign_in].call(:user, user) if session

      {
        session: session,
        errors: session ? [] : ['Invalid credentials']
      }
    end

    private

    def cleanup_session
      context[:sign_out].call(context[:current_user])
      context[:current_session].destroy if context[:current_session]
    end
  end
end