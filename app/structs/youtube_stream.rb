# This structure describes youtube video/audio stream and is based on the youtube api response.
# This class is generated by Extract::YoutubeStreams service
class YoutubeStream < Dry::Struct
  transform_keys(&:to_sym)

  QUALITY_MATCH = {
    'highres' => 0,
    'hd1080' => 1,
    'hd720' => 2,
    'large' => 3,
    'medium' => 4,
    'small' => 5,
    'tiny' => 6
  }.freeze

  attribute :url, Types::String
  attribute :mime_type, Types::String
  attribute :width, Types::Coercible::Integer.optional
  attribute :height, Types::Coercible::Integer.optional
  attribute :bitrate, Types::Coercible::Integer
  attribute :quality, Types::String
  #attribute :audio_sample_rate, Types::Coercible::Integer
  attribute :approx_duration_ms, Types::Coercible::Integer

  def <=>(other)
    sort_key <=> other&.sort_key
  end

  def approx_duration
    approx_duration_ms / 1000.0
  end

  def sort_key
    QUALITY_MATCH[quality] || QUALITY_MATCH['medium']
  end
end