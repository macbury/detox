module Channels
  module Youtube
    # Download information for channel and update channel info in database
    class Fetch < Service
      use Download, as: :download

      def initialize(channel)
        @channel = channel
      end

      def call
        channel.name ||= channel_metadata.title
        channel.site_url ||= channel_metadata.site_url
        channel.description ||= channel_metadata.description
        channel.save!
        channel
      end

      private

      attr_reader :channel

      def channel_metadata
        @channel_metadata ||= download(youtube_url: channel.source)
      end
    end
  end
end