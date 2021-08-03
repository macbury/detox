module Sanitizer
  # Get image size, and its blurhash and store its information in img nodes
  class CacheImageSizeAndBlurhash < Service
    use Extract::ImageDetails, as: :extract_image_details
    use Extract::ImageBlurhash, as: :extract_blurhash

    def initialize(doc)
      @doc = doc.is_a?(String) ? Nokogiri::HTML.fragment(doc) : doc
    end

    def call
      doc.css('img').each do |node|
        url = node.get_attribute('data-detox-src')

        image = extract_image_details(url)
        next unless image

        set_size_in_style(node, image)

        blurhash = extract_blurhash(url)
        store_metadata(node, blurhash, url, image)
      rescue ServiceFailure => e
        error "Could not fetch #{url} because: #{e}"
      end

      doc
    end

    private

    attr_reader :content, :doc, :barrier

    # This will prevent bouncing of the content until image is downloaded
    def set_size_in_style(node, image)
      node.set_attribute('style', "width: #{image.width}px; height: #{image.height}px")
    end

    # Save metadata information in data-detox, react reader will extract this information and show pretty blurhash while loading images
    def store_metadata(node, blurhash, url, image)
      return unless blurhash

      node.set_attribute('data-detox', {
        blurhash: blurhash,
        url: url,
        width: image.width,
        height: image.height
      }.to_json)
    end
  end
end