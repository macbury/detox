module Channels
  module Rss
    # Check if entry metadata is spam
    class BlacklistedEntry < Service
      use Urls::Normalize, as: :normalize_url
      use Sanitizer::Full, as: :full_sanitize

      def initialize(channel:, entry:)
        @entry = entry
        @channel = channel
      end

      def call
        title = entry_title.downcase

        blacklist.find do |rule|
          title.match(rule.downcase)
        end.present?
      end

      private

      attr_reader :entry, :channel

      def entry_title
        return full_sanitize(entry.title) if entry.title.present?
        return full_sanitize(entry.summary) if entry.summary.present?

        "There isn't a title for this story"
      end

      def blacklist
        channel.block_rules + global_blacklist
      end

      def global_blacklist
        Setting.get(:words_blacklist)&.split(',')&.map(&:strip) || []
      end
    end
  end
end