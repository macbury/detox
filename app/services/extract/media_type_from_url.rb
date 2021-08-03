module Extract
  # Get media typ from url
  class MediaTypeFromUrl < Service
    use Proxy::ResolveUrl, as: :resolve_url
    use Urls::Normalize, as: :normalize_url

    def initialize(media_url, mime_type: nil, internet: nil)
      @media_url = media_url ? normalize_url(media_url) : nil
      @mime_type = mime_type
      @owned_internet = !internet
      @internet = internet || Async::HTTP::Internet.new
    end

    def call
      return media_url if media_url.blank?
      return build_metadata unless @mime_type.blank?

      Rails.cache.fetch(cache_key, expires_in: 1.day) do
        return unless response.success?
        
        build_metadata
      end
    ensure
      internet.close unless @owned_internet
    end

    private

    attr_reader :media_url, :mime_type, :internet

    def build_metadata
      MediaMetadata.new(
        url: media_url,
        mime_type: mime_type
      )
    end

    def cache_key
      [self.class.name, media_url]
    end

    def url
      @url ||= resolve_url(media_url)
    end

    def response
      @response ||= internet.head(url).tap(&:read)
    end

    def mime_type
      @mime_type || response.headers['content-type'] || 'unknown'
    end
  end
end