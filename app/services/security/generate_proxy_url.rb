module Security
  # Url passed to this service will be converted to be used by our builtin proxy
  class GenerateProxyUrl < Service
    def initialize(url)
      @url = url
    end

    def call
      File.join(proxy_host, "/api/proxy/#{hexdigest}/#{encoded_url}")
    end

    private

    attr_reader :url

    def encoded_url
      @encoded_url ||= url.unpack1('H*')
    end

    def hexdigest
      @hexdigest ||= OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new('sha1'), proxy_key, url)
    end

    def proxy_host
      ENV.fetch('APP_HOST')
    end

    def proxy_key
      ENV.fetch('PROXY_KEY')
    end
  end
end