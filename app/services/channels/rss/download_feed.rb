module Channels
  module Rss
    # Download feedjira rss feed
    class DownloadFeed < Service
      use Download::Get, as: :download

      def initialize(feed_url:, headers: {})
        @feed_url = feed_url
        @headers = headers
      end

      def call
        rss_feed || guess_feed || atom_feed
      end

      private

      attr_reader :feed_url, :headers

      def feed_body
        @feed_body ||= download(
          url: feed_url,
          headers: headers,
          html: false,
          cache: 10.minutes,
          parse: false
        )
      end

      def guess_feed
        Feedjira.parse(feed_body)
      rescue Feedjira::NoParserAvailable
        nil
      end

      def rss_feed
        feed = Feedjira.parse(feed_body, parser: Feedjira::Parser::RSS)
        feed.entries.empty? ? nil : feed
      rescue Feedjira::NoParserAvailable
        nil
      end

      def atom_feed
        parsed = Feedjira.parse(feed_body, parser: Feedjira::Parser::Atom)
        raise ServiceFailure, 'No valid parser for XML.' if parsed.entries.empty?

        parsed
      rescue Feedjira::NoParserAvailable => e
        raise ServiceFailure, e
      end
    end
  end
end
