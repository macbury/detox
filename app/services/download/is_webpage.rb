module Download
  # Check if url content type is html
  class IsWebpage < Service
    HEADERS = {
      'accept': 'text/html,application/xhtml+xml,application/xml',
    }.freeze
    HTML_CONTENT_TYPE = /html/i

    def initialize(url, internet: nil)
      @url = url
      @owned_internet = !internet
      @internet = internet || Async::HTTP::Internet.new
    end

    def call
      response.read
      Rails.logger.info "Url #{url} content type is #{content_type}"
      html?
    rescue EOFError => _e
      html?
    ensure
      response.close if @response
      @internet&.close if owned_internet
    end

    private

    attr_reader :url, :headers, :html, :timeout, :owned_internet

    def content_type
      @content_type ||= response.headers['content-type'] || 'unknown'
    end

    def html?
      content_type.match(HTML_CONTENT_TYPE).present?
    end

    def response
      @response ||= @internet.head(url, HEADERS)
    end
  end
end