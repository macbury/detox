module Extract
  # Check if PosterMetaData or image url could be a poster
  class LooksLikePoster < Service
    use ImageDetails, as: :get_image_details
    MIN_RESOLUTION = 128 * 128

    def initialize(image_url_or_poster)
      @image_url_or_poster = image_url_or_poster
    end

    def call
      return false unless image_url_or_poster

      @poster = image_url_or_poster.is_a?(PosterMetaData) ? image_url_or_poster : get_image_details(image_url_or_poster)
      return unless @poster

      @poster.resolution >= MIN_RESOLUTION
    end

    private

    attr_reader :image_url_or_poster
  end
end