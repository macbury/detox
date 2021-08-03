module Urls
  # Prepend missing protocol to url
  class PrependProtocol < Service
    def initialize(url, protocol: 'https')
      @url = url
      @protocol = protocol
    end

    def call
      return unless url

      Addressable::URI.heuristic_parse(url).to_s
    end

    private

    attr_reader :url, :protocol
  end
end