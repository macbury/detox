module Channels
  module Twitter
    # Download twitter feed for user
    class Refresh < Service
      use Fetch, as: :fetch
      use GetUserHandler, as: :get_user_handle

      def initialize(channel)
        @channel = channel
        @username = get_user_handle(channel.source)
      end

      def call
        # (globalObjects.tweets).values
        #   full_text
        #   id 
        #   user_id
        #   entities
        #     media
        #       type
        #       media_url_https
        #     urls
        #       expanded_url
      end

      private

      attr_reader :channel, :username

      def feed
        @feed ||= fetch(username)
      end
      
    end
  end
end