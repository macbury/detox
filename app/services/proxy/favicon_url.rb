module Proxy
  class FaviconUrl < Service
    use Security::SignUrl, as: :sign_url

    def initialize(url)
      @url = url
    end

    def call
      Rails.application.routes.url_helpers.proxy_favicon_url(signed_url.to_h)
    end

    private

    attr_reader :url

    def signed_url
      @signed_url ||= sign_url(url)
    end
  end
end