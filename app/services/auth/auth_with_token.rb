module Auth
  # Check if provided access token is valid, and can be used for authorizing access to resource
  class AuthWithToken < Service
    def initialize(jwt_token)
      @jwt_token = jwt_token
      @jwt_token = JSON.parse(@jwt_token) if jwt_token[0] == ('"')
    end

    def call
      return false unless session

      verify_token!
      session.touch
      session
    rescue JWT::DecodeError, JSON::ParserError, JWT::InvalidAudError => e
      error "Invalid auth token: #{e}"
      false
    end

    private

    attr_reader :jwt_token, :scope

    def token_data
      @token_data ||= Tokens::Decode.call(jwt_token)
    end

    def session_id
      @session_id ||= token_data&.dig(0, 'iss')
    end

    def session
      @session ||= Session.find_by(id: session_id)
    end

    def verify_token!
      JWT.decode jwt_token, session.public_key, true, {
        verify_aud: true,
        verify_iss: true,
        algorithm: 'ES256'
      }
    end
  end
end