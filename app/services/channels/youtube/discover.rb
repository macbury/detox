module Channels
  module Youtube
    # Check if text is channel url or user url and fetch information about it
    class Discover < Service
      use Download, as: :download

      def initialize(youtube_channel_id: nil, youtube_url: nil)
        @youtube_url = youtube_url
        @youtube_channel_id = youtube_channel_id
      end

      def call
        return unless channel_metadata

        DiscoveredChannel.new(
          kind: 'youtube',
          title: channel_metadata.title,
          source: channel_metadata.source,
          url: channel_metadata.site_url,
          icon_url: channel_metadata.icon_url
        )
      end

      private

      def channel_metadata
        @channel_metadata ||= download(youtube_url: @youtube_url, youtube_channel_id: @youtube_channel_id)
      end
    end
  end
end