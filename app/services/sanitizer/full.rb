module Sanitizer
  # Cleanup all html tags and strip white spaces from passed content
  class Full < Service
    def initialize(content)
      @sanitizer = Rails::Html::FullSanitizer.new
      @content = content
    end

    def call
      sanitized = sanitizer.sanitize(content)&.strip
      CGI.unescapeHTML(sanitized) if sanitized.present?
    end

    private

    attr_reader :content, :sanitizer
  end
end