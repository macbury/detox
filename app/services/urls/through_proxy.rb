module Urls
  # Change all urls in media tags(img, audio, source, video and iframe) to be proxed using proxy server
  class ThroughProxy < Service
    DATA_URL = 'data:'
    use Security::GenerateProxyUrl, as: :sign_url

    def initialize(doc)
      @doc = doc.is_a?(String) ? Nokogiri::HTML.fragment(doc) : doc
    end

    def call
      MEDIA_TAGS_WITH_URLS.each do |tag, attr|
        doc.css("#{tag}[#{attr}]").each do |node|
          url = node.get_attribute(attr)

          begin
            next if url.starts_with?(DATA_URL)

            node.set_attribute(attr, sign_url(url))
            node.set_attribute('data-detox-src', url)
          rescue URI::InvalidURIError => e
            error "Invalid url: #{url} reason: #{e}"
          end
        end
      end

      doc
    end

    private

    attr_reader :doc
  end
end