module Extract
  class PageContent < Service
    use Download::Get, as: :download

    def initialize(url:)
      @url = url
    end

    def call
      info "Extracting content of #{url} using Readability"
      Readability::Document.new(
        html_source,
        tags: Sanitizer::Scrubber::PERMITTED_TAGS,
        attributes: Sanitizer::Scrubber::ALLOWED_ATTRIBUTES,
        remove_empty_nodes: true
      ).content
    end

    private

    attr_reader :url

    def html_source
      @html_source ||= download(
        url: url,
        html: true,
        cache: 5.minutes
      )
    end
  end
end