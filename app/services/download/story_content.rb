module Download
  class StoryContent < Service
    use Sanitizer::Story, as: :sanitize
    use Extract::PageContent, as: :download_and_automatic_extract
    use Extract::PageWithRules, as: :download_and_manual_extract

    def initialize(story:)
      @story = story
    end

    def call
      raise ServiceFailure, 'Could not extract content' unless sanitized_content

      story.attachment.update!(body: sanitized_content)
    end

    private

    attr_reader :story

    def page_content
      if story.channel.manual_extraction?
        download_and_manual_extract(url: story.permalink, **story.channel.extract_rules)
      else
        download_and_automatic_extract(url: story.permalink)
      end
    end

    def sanitized_content
      @sanitized_content ||= sanitize(page_content, base_url: story.permalink)
    end
  end
end