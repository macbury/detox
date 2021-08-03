module Extract
  # Extract content using css selectors
  class PageWithRules < Service
    use Download::Get, as: :download
    use ContentWithRules, as: :extract_content

    def initialize(url:, scrape: [], reject: [])
      @url = url
      @scrape = scrape
      @reject = reject
    end

    def call
      info "Extracting content of #{url} using manual rules"
      extract_content(
        content: html_source,
        scrape: scrape,
        reject: reject
      )
    end

    private

    attr_reader :url, :scrape, :reject

    def html_source
      @html_source ||= download(
        url: url,
        html: true,
        cache: 5.minutes
      )
    end
  end
end