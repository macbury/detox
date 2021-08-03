module Extract
  # Find largest image in nokogiri document and return it
  class PosterImage < Service
    use LooksLikePoster, as: :looks_like_poster?
    use ImageDetails, as: :get_image_details

    IMAGE_TAG = 'img'.freeze

    def initialize(doc)
      @doc = doc.is_a?(String) ? Nokogiri::HTML.fragment(doc) : doc
    end

    def call
      images
        .filter { |poster| looks_like_poster?(poster) }
        .sort { |a, b| b.width <=> a.width }
        .first
    end

    private

    attr_reader :doc

    def images
      @images ||= doc.css(IMAGE_TAG).each_with_object([]) do |img, output|
        url = img[:'data-detox-src']
        next unless url

        output << get_image_details(url)
      end.compact
    end
  end
end