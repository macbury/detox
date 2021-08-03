module Extract
  # Get first paragraph of text
  class Summary < Service
    use Sanitizer::Full, as: :full_sanitize

    SUMMARY_LENGTH = 350

    attr_reader :body

    def initialize(body)
      @body = body.is_a?(String) ? Nokogiri::HTML.fragment(body) : body
    end

    def call
      if paragraphs.empty?
        body.text.strip.truncate(SUMMARY_LENGTH)
      else
        summary = ''
        while paragraphs.size > 0
          summary += paragraphs.shift.text
          summary.strip!

          return summary.truncate(SUMMARY_LENGTH) if summary.length > SUMMARY_LENGTH
        end

        return summary
      end
    end

    private

    def paragraphs
      @paragraphs ||= body.search('p')
    end

  end
end