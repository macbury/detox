module Channels
  module Twitter
    # Check if text is twitter profile
    class Discover < Service
      use Favicon::FromTwitter, as: :profile_icon_url
      use GetUserHandler, as: :get_user_handler
      use Fetch, as: :download

      def initialize(twitter_url:)
        @twitter_url = twitter_url
      end

      def call
        handler = get_user_handler(twitter_url)
        return if handler.blank?
        return if download(handler).dig('globalObjects', 'tweets').empty?

        DiscoveredChannel.new(
          kind: 'twitter',
          title: handler,
          source: twitter_url,
          url: twitter_url,
          icon_url: profile_icon_url(twitter_url)
        )
      end

      private

      attr_reader :twitter_url
      
    end
  end
end