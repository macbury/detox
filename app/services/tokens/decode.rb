module Tokens
  # Just decode token into ruby hash, Token is not verified so it can be malicious.
  class Decode < Base
    def initialize(token)
      @token = token
    end

    def call
      JWT.decode token, nil, false, jwt_options
    rescue JWT::DecodeError, JSON::ParserError
      nil
    end

    private

    attr_reader :token
  end
end