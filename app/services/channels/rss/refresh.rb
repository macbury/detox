module Channels
  module Rss
    # Download update feed information and download its entries
    class Refresh < Service
      use Fetch, as: :fetch
      use BlacklistedEntry, as: :entry_blacklisted?

      attr_reader :channel

      def initialize(channel)
        @channel = channel
      end

      def call
        Rails.logger.info "New entries: #{missing_guids.size}"
        attach_feed_image_url! unless channel.icon_data

        newest_entries.each do |feed_entry|
          next unless missing_guids.include?(feed_entry.id)
          next if entry_blacklisted?(channel: @channel, entry: feed_entry)

          feed_entry.enclosure_poster ||= feed_image_url # some podcast have only feed image
          CreateRssEntryJob.perform_later(channel.id, feed_entry.to_yaml, channel.kind)
        end
      end

      private

      def attach_feed_image_url!
        return unless feed_image_url

        channel.icon = IconUploader.remote_url(feed_image_url)
        channel.icon_derivatives!

        channel.save!
      end

      def feed_image_url
        feed.respond_to?(:image) ? feed.image&.url : nil
      end

      def newest_entries
        feed.entries.sort_by(&:published).last(10) # Get only last 10 entries
      end

      def feed
        @feed ||= fetch(channel)
      end

      def feed_guids
        @feed_guids ||= feed.entries.map(&:id)
      end

      def existing_guids
        @existing_guids ||= channel.stories.where(guid: feed_guids).pluck(:guid)
      end

      def missing_guids
        @missing_guids ||= feed_guids - existing_guids
      end
    end
  end
end