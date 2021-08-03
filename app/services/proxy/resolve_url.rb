module Proxy
  # Follow all redirects for provider url
  class ResolveUrl < Service
    use Urls::Validate, as: :valid_url
    use Urls::Normalize, as: :normalize_url

    def initialize(url, limit: 10, headers: {}, internet: nil)
      @url = url
      @limit = limit
      @headers = headers
      @owned_internet = !internet
      @internet = internet || Async::HTTP::Internet.new
    end

    def call
      info "Finding final url for: #{url}"

      Rails.cache.fetch(['ResolveUrl', url], expires_in: 30.minutes) do
        follow(url)
      end
    rescue SocketError, Async::Stop, Async::TimeoutError, URI::InvalidURIError, Errno::ECONNREFUSED, Errno::ECONNRESET, Errno::ENETUNREACH, OpenSSL::SSL::SSLError => e
      raise ServiceFailure, e.to_s
    ensure
      internet&.close if owned_internet
    end

    attr_reader :url, :limit, :internet, :headers, :owned_internet

    private

    def follow(next_url)
      raise ServiceFailure, 'Redirect limit hit!' if limit <= 0
      raise ServiceFailure, "Invalid url: #{next_url}" unless valid_url(next_url)

      @limit -= 1

      info "Fetching head for: #{next_url}"
      resolved_url = head_for(next_url)

      if resolved_url
        resolved_url = normalize_url(resolved_url, base_url: next_url)
        info "Found next url to check: #{resolved_url}"
        follow(resolved_url)
      else
        info "Final url is: #{next_url}"
        next_url
      end
    end

    def head_for(input_url)
      response = internet.head(input_url, headers.to_a)

      raise ServiceFailure, "To many requests, aborting, HTTP status is #{response.status}" if response.status == 429

      response.read
      return input_url if response.headers.nil?

      response.headers['location'] unless response.status == 404
    rescue EOFError
      response.headers['location'] if response
    ensure
      response&.close
    end
  end
end