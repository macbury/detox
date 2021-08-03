module Channels
  module Youtube
    class GetId < Service
      REGEXP = /(UC[A-Za-z0-9_-]{22})/.freeze

      def initialize(url)
        @url = url
      end

      def call
        match = @url.match(REGEXP)
        raise ServiceFailure, "Could not find youtube channel id in: #{@url}" unless match

        match[1]
      end
    end
  end
end