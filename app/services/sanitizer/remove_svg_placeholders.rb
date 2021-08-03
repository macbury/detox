module Sanitizer
  # Some retards decided that is great idea to load images dynamicaly, but before show transparent svg with the size of the image.
  # They could use just fucking div with proper inline styles but hey, that would require basic knowlege about css 
  class RemoveSvgPlaceholders < Service
    DATA_REGEXP = /data:image\/svg+xml/i

    def initialize(doc)
      @doc = doc.is_a?(String) ? Nokogiri::HTML.fragment(doc) : doc
    end

    def call
      doc.css('img').each do |node|
        url = node.get_attribute('src')
        next unless url

        node.remove if url.match(DATA_REGEXP)
      rescue ServiceFailure => e
        error "Could not fetch #{url} because: #{e}"
      end

      doc
    end

    private

    attr_reader :doc
  end
end
