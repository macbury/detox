require 'image_processing/mini_magick'
require 'down/http'

class PosterUploader < Shrine
  plugin :add_metadata
  plugin :store_dimensions
  plugin :validation_helpers
  plugin :determine_mime_type, analyzer: :fastimage
  plugin :infer_extension
  plugin :remote_url, max_size: 10.megabytes, downloader: -> (url, **options) { 
    Down::Http.download(url, **options) do |client|
      client.follow(max_hops: 10).timeout(connect: 30, read: 30)
    end
  }
  plugin :derivatives
  plugin :data_uri
  plugin :pretty_location

  Attacher.validate do
    validate_max_size 5.megabyte
    validate_extension %w[jpg jpeg png webp gif]
  end

  Attacher.derivatives do |original|
    magick = ImageProcessing::MiniMagick.source(original)

    {
      desktop: magick.resize_to_limit!(720, ''),
      mobile: magick.resize_to_limit!(480, '')
    }
  end

  add_metadata :blurhash do |io|
    image = Magick::ImageList.new(io.path)
    Blurhash.encode(image.columns, image.rows, image.export_pixels)
  end

  add_metadata :colors do |io|
    Extract::ColorFromImage.(io.path)
  end
end