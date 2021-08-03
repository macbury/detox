module Channels
  module Twitter
    # Fetch feed json
    class Fetch < Service
      use RetriveApiKeys, as: :retrieve_api_keys
      use Download::Get, as: :download

      def initialize(username)
        @username = username
      end

      def call
        guest_key, api_key = retrieve_api_keys

        download(
          url: url,
          headers: {
            'x-guest-token' => guest_key,
            'authorization' => "Bearer #{api_key}"
          },
          cache: 1.minute
        )
      end

      private

      attr_reader :username

      def url
        "https://api.twitter.com/2/search/adaptive.json?q=from:#{username}%20include:nativeretweets%20exclude:replies&tweet_mode=extended&tweet_search_mode=live"
      end
    end
  end
end