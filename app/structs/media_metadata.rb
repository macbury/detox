class MediaMetadata < Dry::Struct
  transform_keys(&:to_sym)

  IMAGE_MIME_TYPES = %w(image/jpeg image/jpg image/png image/gif).freeze
  VIDEO_MIME_TYPES = %w(video/webm video/mp4 video/quicktime video/ogg).freeze
  AUDIO_MIME_TYPES = %w(audio/wave audio/wav audio/x-wav audio/x-pn-wave audio/ogg audio/mpeg audio/mp3 audio/webm audio/flac audio/aac audio/m4a audio/x-m4a audio/mp4 audio/3gpp video/x-ms-asf).freeze

  attribute :url, Types::String
  attribute :mime_type, Types::String

  def image?
    IMAGE_MIME_TYPES.include?(mime_type)
  end

  def audio?
    AUDIO_MIME_TYPES.include?(mime_type)
  end

  def video?
    VIDEO_MIME_TYPES.include?(mime_type)
  end

  def image_url
    image? ? url : nil
  end

  private

  def extension
    @extension ||= MiniMime.lookup_by_content_type(mime_type)&.extension
  end
end