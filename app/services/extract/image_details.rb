module Extract
  # Fetch size details from image url
  class ImageDetails < Service
    def initialize(image_url)
      @image_url = image_url
    end

    def call
      return unless image_url

      PosterMetaData.new(
        url: image_url,
        width: size[0],
        height: size[1],
        resolution: size[0] * size[1]
      )
    rescue FastImage::SizeNotFound, FastImage::ImageFetchFailure, FastImage::UnknownImageType => e
      error "Could not fetch: #{image_url} because #{e}"
      nil
    end

    private

    attr_reader :image_url

    def size
      @size ||= Rails.cache.fetch(cache_key, expires_in: 1.day) do
        FastImage.size(image_url, raise_on_failure: true, timeout: 60).map(&:to_i)
      end
    end

    def cache_key
      ['ImageSize', image_url].join('::')
    end
  end
end