module Channels
  module Youtube
    # Use youtube pubsub to subscribe for push notification
    # TODO: This can be also used for other websites!
    class SubscribePubsub < Service
      use GetId, as: :get_channel_id

      attr_reader :channel, :internet, :pubsub_subscription

      def initialize(channel)
        @channel = channel
        @internet = Async::HTTP::Internet.new
      end

      def call
        channel.pubsub_subscription&.destroy
        @pubsub_subscription = channel.create_pubsub_subscription!(expire_at: 15.minutes.from_now)

        raise ServiceFailure, "You cannot use pubsub for other kinds than youtube: #{channel.id}" unless channel.youtube?

        @response = internet.post(endpoint, {}, URI.encode_www_form(body))
        @response.read
      ensure
        @response&.close
        internet&.close
      end

      private

      def youtube_id
        @youtube_id ||= get_channel_id(channel.source)
      end

      def endpoint
        'https://pubsubhubbub.appspot.com/subscribe'
      end

      def body
        {
          'hub.callback' => Rails.application.routes.url_helpers.pubsub_url(pubsub_subscription.id),
          'hub.topic' => "https://www.youtube.com/xml/feeds/videos.xml?channel_id=#{youtube_id}",
          'hub.verify' => 'async',
          'hub.mode' => 'subscribe',
          'hub.lease_seconds' => '432000'
        }
      end
    end
  end
end