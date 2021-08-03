module Extract
  # Download image and compute its blurhash for image super quick previews
  class ImageBlurhash < Service
    use Proxy::ResolveUrl, as: :resolve_url
  
    def initialize(image_url)
      @image_url = image_url
      @internet = Async::HTTP::Internet.new
    end

    def call
      return unless image_url

      @image_url = resolve_url(image_url)
      download!

      Blurhash.encode(image.columns, image.rows, image.export_pixels)
    rescue ServiceFailure => e
      raise e
    rescue => e
      error "Could not generate blurhash: #{e}"
      return nil
    ensure
      tempfile.unlink if @tempfile
      @internet&.close
    end

    private

    attr_reader :image_url, :internet

    def image
      @image ||= Magick::ImageList.new(tempfile.path)
    end

    def tempfile
      @tempfile ||= Tempfile.new('preview', encoding: 'ascii-8bit')
    end

    def download!
      response = internet.get(image_url)

      raise ServiceFailure, "Could not download: #{image_url}, HTTP status is: #{response.status}" unless response.status == 200
      raise ServiceFailure, "#{image_url} is not image" unless response.headers['content-type']&.match('image')

      tempfile.write response.read
      tempfile.flush
    rescue Async::Stop, Async::TimeoutError, Errno::ECONNRESET, Errno::ECONNREFUSED, URI::InvalidURIError, Errno::ENETUNREACH, OpenSSL::SSL::SSLError => e
      raise ServiceFailure, e
    ensure
      response&.close
    end
  end
end