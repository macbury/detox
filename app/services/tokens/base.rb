module Tokens
  # Base class for generating or verifing tokens, it setups secret, algorithm and basic jwt options
  class Base < Service
    protected

    attr_reader :hmac_secret

    def secret
      @secret ||= Digest::SHA512.hexdigest(
        [hmac_secret, ENV.fetch('SECRET_KEY_BASE')].compact.join('')
      )
    end

    def algorithm
      'HS256'
    end

    def jwt_options
      {
        algorithm: algorithm
      }
    end
  end
end