module Channels
  module Youtube
    # Check if text is channel url or user url
    class Url < Service
      URL_CHANNELS = [
        /youtube.com\/user\/(.+)/i,
        /youtube.com\/channel\/(.+)/i,
        /youtube.com\/c\/(.+)/i,
        /youtube.com\/feeds\/videos\.xml\?channel_id=(.+)/i
      ].freeze

      attr_reader :url

      def initialize(url)
        @url = url
      end

      def call
        URL_CHANNELS.each do |regexp|
          matched = url.match(regexp)

          return matched[1] if matched
        end
      end
    end
  end
end