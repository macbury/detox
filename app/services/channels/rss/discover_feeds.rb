require 'feedbag'
module Channels
  module Rss
    # Check if page contains a rss feed
    class DiscoverFeeds < Service
      COMMON_FEED_PATHS = [
        '/feed',
        '/rss',
        '/atom',
        '/rss.xml',
        '/feed.rss',
        '/feed.xml',
        '/feed.atom'
      ].freeze

      use Favicon::FromUrl, as: :get_favicon_url
      use Rss::DownloadFeed, as: :download_feed
      use Sanitizer::Full, as: :sanitize
      use Urls::PrependProtocol, as: :prepend_https

      attr_reader :url

      def initialize(url)
        @url = url
        @barrier = Async::Barrier.new
        @semaphore = Async::Semaphore.new(20)
        @tasks = []
      end

      def call
        async_discover_feed(url)

        common_paths_to_check.each { |feed_url| async_discover_feed(feed_url) }

        ::Feedbag.find(url).each do |feed_url|
          async_discover_feed(feed_url)
        end

        barrier.wait
        tasks.map(&:result).compact.uniq(&:url)
      rescue URI::InvalidURIError, StandardError => e
        error "Could not fetch #{url} because: #{e}"
        raise ServiceFailure, e
      end

      private

      attr_reader :barrier, :semaphore, :tasks

      def common_paths_to_check
        COMMON_FEED_PATHS.map do |path|
          uri = URI.parse(url)
          uri.path = File.join(uri.path, path)
          uri.to_s
        end
      end

      def async_discover_feed(feed_url)
        @tasks << barrier.async { build_discovered_feed(feed_url) }
      end

      def build_discovered_feed(feed_url)
        info "Found: #{feed_url}"
        feed = download_feed(feed_url: feed_url, headers: {
          'Accept' => 'application/rss+xml,text/html,application/xhtml+xml,application/xml'
        })

        site_url = prepend_https(feed.url)

        DiscoveredChannel.new(
          kind: 'rss',
          title: sanitize(feed.title),
          source: prepend_https(feed_url),
          url: site_url,
          icon_url: get_favicon_url(site_url)
        )
      rescue Dry::Struct::Error => e
        error "Could not build discovered channel for: #{feed_url} because #{e}"
        nil
      rescue ServiceFailure => e
        error "Could not fetch #{feed_url} because: #{e}"
        nil
      end
    end
  end
end