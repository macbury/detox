module Tokens
  # Decode token to ruby hash and verify its signature. This service ensures that token is valid
  class Verify < Base
    def initialize(hmac_secret: nil, token:, aud: nil, iss: nil)
      @token = token
      @hmac_secret = hmac_secret
      @aud = aud
      @iss = iss
    end

    def call
      JWT.decode token, secret, true, jwt_options
    rescue JWT::DecodeError, JSON::ParserError, JWT::InvalidAudError
      false
    end

    private

    attr_reader :token, :aud, :iss

    def jwt_options
      super.merge(
        aud: aud,
        iss: iss,
        verify_aud: aud.present?,
        verify_iss: iss.present?
      )
    end
  end
end