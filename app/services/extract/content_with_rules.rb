module Extract
  # Extract content using css selectors
  class ContentWithRules < Service
    DEFAULT_REJECT = ['script', 'style'].freeze

    def initialize(content:, scrape: '', reject: [])
      @scrape = [scrape].flatten.reject(&:empty?)
      @reject = reject + DEFAULT_REJECT
      @content = content
    end

    def call
      reject_elements
      scrape_elements

      result_html
    end

    private

    attr_reader :content, :scrape, :reject

    def document
      @document ||= Nokogiri::HTML.fragment(content)
    end

    def result_html
      CGI.unescapeHTML(document.to_html)
    end

    def reject_elements
      info "Rejecting using #{reject}"
      reject.each do |rule|
        document.search(rule).remove
      end
    end

    def scrape_elements
      return if scrape.empty?

      info "Scraping using #{scrape}"
      @content = document.search(scrape.join(', ')).to_html

      @document = nil
    end
  end
end