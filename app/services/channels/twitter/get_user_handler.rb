module Channels
  module Twitter
    class GetUserHandler < Service
      TWITTER_REGEXP = /https:\/\/twitter\.com\/([a-z0-9\-]+)/i

      def initialize(twitter_profile_url)
        @twitter_profile_url = twitter_profile_url
      end

      def call
        match = TWITTER_REGEXP.match(twitter_profile_url)
        return unless match

        match[1].downcase
      end

      private

      attr_reader :twitter_profile_url
    end
  end
end