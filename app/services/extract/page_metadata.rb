module Extract
  class PageMetadata < Service
    use Download::Get, as: :download

    def initialize(url:)
      @url = url
    end

    def call
      attributes = {}
      document.search('meta').each do |meta|
        next unless match = meta.attribute('name').to_s.match(/^twitter:(.+)$/i)

        attributes[match[1].underscore] = meta.attribute('content').to_s 
      end
      ::PageMetadata.new(attributes.symbolize_keys)
    rescue ServiceFailure, Dry::Struct::Error => e
      error "Could not fetch metadata for #{url}, reason: #{e}"
      nil
    end

    private

    attr_reader :url

    def html_source
      @html_source ||= download(
        url: url,
        html: true,
        cache: 1.day
      )
    end

    def document
      @document ||= Nokogiri::HTML.fragment(html_source)
    end
  end
end