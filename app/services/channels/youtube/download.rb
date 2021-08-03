module Channels
  module Youtube
    # Download information for channel
    class Download < Service
      CACHE_TIME = 10.minutes

      attr_reader :youtube_channel_id, :youtube_url

      CHANNEL_ID = /www.youtube.com\/channel\/(.+)/i
      CHANNEL_FEED_ID = /youtube.com\/feeds\/videos\.xml\?channel_id=(.+)/i
      SMALL_CHANNEL_FEED_ID = /www.youtube.com\/C\/(.+)/i

      use ::Download::Get, as: :download
      use Sanitizer::Full, as: :sanitize
      use Url, as: :extract_channel_id

      def initialize(youtube_channel_id: nil, youtube_url: nil)
        @youtube_url = youtube_url
        @youtube_channel_id = youtube_channel_id
      end

      def call
        transform_rss_to_url!

        return unless channel_id

        ChannelMetadata.new(
          kind: 'youtube',
          title: title,
          source: feed_url,
          site_url: channel_url,
          icon_url: image_url,
          id: channel_id,
          description: description
        )
      end

      private

      def transform_rss_to_url!
        return unless @youtube_url

        match = @youtube_url.match(CHANNEL_FEED_ID)

        return unless match

        @youtube_url = nil
        @youtube_channel_id = match[1]
      end

      def youtube_url
        @youtube_url ||= "https://youtube.com/channel/#{youtube_channel_id}"
      end

      def content
        @content ||= download(url: youtube_url, html: true)
      end

      def channel_id
        @channel_id ||= channel_url&.match(CHANNEL_ID)&.to_a&.second
      end

      def doc
        @doc ||= Nokogiri::HTML.fragment(content)
      end

      def channel_url
        @channel_url ||= meta_info("og:url")
      end

      def feed_url
        @feed_url ||= "https://www.youtube.com/feeds/videos.xml?channel_id=#{channel_id}"
      end

      def title
        @title ||= meta_info("og:title")
      end

      def description
        @description ||= meta_info("og:description") || ''
      end

      def image_url
        @image_url ||= meta_info("og:image")
      end

      def meta_info(key)
        sanitize(doc.search("meta[property=\"#{key}\"]").first['content'] || '')
      end
    end
  end
end