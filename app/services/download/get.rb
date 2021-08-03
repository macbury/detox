module Download
  class Get < Service
    JSON_CONTENT_TYPE = /application\/json/i
    HTML_CONTENT_TYPE = /html/i
    DEFAULT_HEADERS = {
      'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0',
      'accept-encoding' => 'gzip'
    }.freeze

    use Proxy::ResolveUrl, as: :resolve_final_url

    def initialize(url:, headers: {}, html: false, timeout: 25, cache: nil, internet: nil, parse: true)
      @url = url
      @headers = DEFAULT_HEADERS.merge(headers).reject { |_k, v| v.blank? }
      @headers['accept'] ||= 'text/html, application/xhtml+xml' if html
      @timeout = timeout
      @owned_internet = !internet
      @internet = internet || Async::HTTP::Internet.new
      @cache = cache
      @etag = Rails.cache.read(etag_cache_key)
      @html = html
      @parse = parse
      @headers['If-None-Match'] = @etag if etag
    end

    def call
      if cache && Rails.cache.exist?(cache_key)
        info 'Forced cached response'
        return Rails.cache.read(cache_key)
      end
      download!
    end

    private

    attr_reader :url, :etag, :headers, :html, :timeout, :internet, :cache, :owned_internet, :parse

    def cache_key
      ['download', url].join('::')
    end

    def etag_cache_key
      ['etag', url].join('::')
    end

    def download!(retry_left: 5)
      response = internet.get(final_url, headers)
      if response.status == 304
        info "Loading from cache: #{cache_key}"
        return Rails.cache.read(cache_key)
      end

      validate_webpage!(response) if html
      save_etag(response)

      if response.status == 503 && retry_left.positive?
        response.close

        Async::Task.current.sleep 3
        info "Retry left: #{retry_left} for #{url}"
        return download!(retry_left: retry_left - 1)
      end

      unless response.success?
        Rails.cache.delete(etag_cache_key)
        Rails.cache.delete(cache_key)
        raise ServiceFailure, "Response status code is invalid: #{response.status}" 
      end

      body = compressed?(response) ? deflate(response) : response.read
      body = JSON.parse(body) if parse && response.headers['content-type']&.match(JSON_CONTENT_TYPE)

      if cache || etag
        info "Saving response in cache"
        Rails.cache.write(cache_key, body, expires_in: cache)
      end

      body
    rescue Async::Stop, Async::TimeoutError, URI::InvalidURIError, Errno::ECONNREFUSED, Errno::ECONNRESET, Errno::ENETUNREACH, Errno::EHOSTUNREACH, OpenSSL::SSL::SSLError => e
      raise ServiceFailure, e.to_s
    ensure
      response&.close
      internet&.close if owned_internet
    end

    def save_etag(response)
      return unless response.headers

      @etag = response.headers['etag']
      Rails.cache.write(etag_cache_key, @etag, expires_in: cache) if @etag
    end

    def validate_webpage!(response)
      content_type = response.headers['content-type'] || 'unknown'
      raise ServiceFailure, "Url #{url} is not a webpage!" unless content_type.match(HTML_CONTENT_TYPE).present?
    end

    def compressed?(response)
      encodings = response.headers['content-encoding'] || []
      encodings.include?('gzip')
    end

    def deflate(response)
      Zlib::GzipReader.new(StringIO.new(response.read)).read
    end

    def final_url
      @final_url ||= resolve_final_url(url, headers: headers, internet: internet)
    end
  end
end