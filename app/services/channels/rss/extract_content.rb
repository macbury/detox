module Channels
  module Rss
    # Extract text from entry summary or content
    class ExtractContent < Service
      use Sanitizer::Story, as: :sanitize
      use Extract::PageContent, as: :download_and_automatic_extract
      use Extract::PageWithRules, as: :download_and_manual_extract
      use Extract::ContentWithRules, as: :extract_content_manually

      def initialize(entry, channel)
        @entry = entry
        @channel = channel
      end

      def call
        sanitize(content, base_url: entry.url)
      end

      private

      attr_reader :entry, :sanitizer, :channel

      def content
        if channel.download_page && entry.url
          page_content
        else
          feed_content
        end
      end

      def feed_content
        entry_content = (entry.content || entry.summary || '')
        return entry_content unless channel.manual_extraction?

        extract_content_manually(content: entry_content, **channel.extract_rules)
      end

      def page_content
        if channel.manual_extraction?
          download_and_manual_extract(url: entry.url, **channel.extract_rules)
        else
          download_and_automatic_extract(url: entry.url)
        end
      end
    end
  end
end