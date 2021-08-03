module Channels
  module Rss
    # Download feed content and update channel information
    # Return feed source
    class Fetch < Service
      use Sanitizer::Full, as: :sanitize
      use Urls::Normalize, as: :normalize_url
      use DownloadFeed, as: :download_feed

      def initialize(channel)
        @channel = channel
      end

      def call
        channel.name ||= sanitize(feed.title) || sanitize(feed.url)
        channel.site_url = normalize_url(feed.url) if channel.site_url.blank?
        channel.description = description
        channel.save!

        feed
      end

      private

      attr_reader :channel

      def feed
        @feed ||= download_feed(
          feed_url: channel.source,
          headers: {
            'User-Agent' => channel.user_agent
          }
        )
      end

      def description
        feed.respond_to?(:description) ? sanitize(feed.description) : ''
      end
    end
  end
end