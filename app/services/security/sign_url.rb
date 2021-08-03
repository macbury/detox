module Security
  # Generate signed url that prevents 3rd party users to pass their own urls to proxy
  class SignUrl < Service
    Result = Struct.new(:hash, :encoded_url)

    def initialize(url)
      @url = url
    end

    def call
      Result.new(
        hash,
        encoded_url
      )
    end

    private

    attr_reader :url

    def hash
      @hash ||= Digest::SHA256.hexdigest(secret_key + url)[0..11]
    end

    def encoded_url
      @encoded_url ||= Base64.urlsafe_encode64(url.strip)
    end

    def secret_key
      ENV.fetch('SECRET_KEY_BASE')
    end
  end
end