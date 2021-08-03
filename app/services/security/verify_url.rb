module Security
  # Check if url signature is valid and returns decoded url
  class VerifyUrl < Service
    def initialize(hash:, encoded_url:)
      @hash = hash
      @encoded_url = encoded_url
    end

    def call
      return decoded_url if decoded_hash == hash

      raise ServiceFailure, "Invalid hash(#{hash}) for #{decoded_url}"
    end

    private

    attr_reader :encoded_url, :hash

    def decoded_hash
      @decoded_hash ||= Digest::SHA256.hexdigest(secret_key + decoded_url)[0..11]
    end

    def decoded_url
      @decoded_url ||= Base64.urlsafe_decode64(encoded_url)
    end

    def secret_key
      ENV.fetch('SECRET_KEY_BASE')
    end
  end
end