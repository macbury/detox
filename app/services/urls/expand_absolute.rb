module Urls
  # Expand urls from relative one to absolute one in html elements like a, img, video, audio, iframe
  class ExpandAbsolute < Service
    use Normalize, as: :normalize_url

    def initialize(doc, base_url = nil)
      @doc = doc.is_a?(String) ? Nokogiri::HTML.fragment(doc) : doc
      @base_url = base_url
    end

    def call
      TAGS_WITH_URLS.each do |tag, attr|
        doc.css("#{tag}[#{attr}]").each do |node|
          url = node.get_attribute(attr)

          begin
            node.set_attribute(attr, normalize_url(url, base_url: base_url))
          rescue URI::InvalidURIError => e
            error "Invalid url: #{url} reason: #{e}"
          end
        end
      end

      doc
    end

    private

    attr_reader :doc, :base_url
  end
end