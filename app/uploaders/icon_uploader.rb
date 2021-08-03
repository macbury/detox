require 'image_processing/mini_magick'

class IconUploader < Shrine
  plugin :validation_helpers
  plugin :determine_mime_type, analyzer: :fastimage
  plugin :infer_extension
  plugin :remote_url, max_size: 10.megabytes
  plugin :derivatives
  plugin :pretty_location

  Attacher.validate do
    validate_max_size 10.megabyte
    validate_extension %w[jpg jpeg png webp ico gif]
  end

  Attacher.derivatives do |original|
    magick = ImageProcessing::MiniMagick.source(original)

    {
      sidebar: magick.resize_to_limit!(48, 48)
    }
  end
end