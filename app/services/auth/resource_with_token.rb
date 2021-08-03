module Auth
  # Generate JWT token that has encoded refresh token and proper scope
  class ResourceWithToken < Service
    def initialize(jwt_token, scope)
      @jwt_token = jwt_token
      @scope = scope
    end

    def call
      return unless refresh_token
      return unless valid_jwt_token?

      refresh_token
    end

    private

    attr_reader :jwt_token, :scope

    def token_data
      @token_data ||= Tokens::Decode.call(jwt_token)
    end

    def refresh_token_id
      @refresh_token_id ||= token_data&.dig(0, 'refresh_token_id')
    end

    def refresh_token
      @refresh_token ||= RefreshToken.find_by(id: refresh_token_id)
    end

    def valid_jwt_token?
      Tokens::Verify.call(
        hmac_secret: refresh_token.jwt_hmac_secret_base,
        token: jwt_token,
        aud: scope
      ).present?
    end
  end
end