module Channels
  module Rss
    # Transform feed entry into EntryMetadata
    class BuildEntry < Service
      use ExtractContent, as: :extract_content
      use Urls::Normalize, as: :normalize_url
      use Sanitizer::Full, as: :full_sanitize
      use Extract::PosterImage, as: :find_poster_image_url
      use Extract::PageMetadata, as: :page_metadata
      use Extract::LooksLikePoster, as: :looks_like_poster?
      use Extract::MediaTypeFromUrl, as: :media_type_from_url

      def initialize(channel:, entry:)
        @entry = entry
        @channel = channel
      end
   
      def call
        EntryMetaData.new(
          guid: guid,
          title: entry_title,
          permalink: entry_url,
          body: body,
          published_at: published_at,
          poster_url: looks_like_poster?(poster_url) ? poster_url : nil,
          comments_url: entry.comments_url,
          media_url: media_url
        )
      end

      private

      attr_reader :entry, :channel

      def enclosure_metadata
        @enclosure_metadata ||= media_type_from_url(entry.enclosure_url, mime_type: entry.enclosure_type)
      end

      def media_url
        enclosure_metadata&.audio? ? enclosure_metadata.url : nil
      end

      def guid
        @guid ||= entry.id || entry_url
      end

      def comments_url
        return unless entry.comments_url

        normalize_url(entry.comments_url, base_url: channel.site_url)
      end

      def published_at
        entry.published || Time.zone.now
      end

      def body
        @body ||= extract_content(entry, channel)
      end

      def entry_title
        return full_sanitize(entry.title) if entry.title.present?
        return full_sanitize(entry.summary) if entry.summary.present?

        "There isn't a title for this story"
      end

      def poster_url
        if channel.rewrite_rule?(Channel::REWRITE_RULE_REPLACE_POSTER)
          @poster_url ||= body_poster_url || meta_tag_poster_url
        else
          @poster_url ||= entry.enclosure_poster || enclosure_metadata&.image_url || meta_tag_poster_url || body_poster_url
        end
      end

      def entry_url
        return entry.enclosure_url if entry.url.nil? && entry.respond_to?(:enclosure_url)

        normalize_url(entry.url, base_url: channel.site_url) unless entry.url.nil?
      end

      def meta_tag_poster_url
        page_metadata(url: entry_url)&.image
      end

      def body_poster_url
        find_poster_image_url(body)&.url
      end
    end
  end
end