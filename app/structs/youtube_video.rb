class YoutubeVideo < Dry::Struct
  transform_keys(&:to_sym)

  attribute :id, Types::String
  attribute :uri, Types::String
  attribute :title, Types::String
  attribute :description, Types::String
  attribute :poster_url, Types::String
  attribute :approx_duration_ms, Types::Coercible::Integer
  attribute :streams, Types::Strict::Array.of(YoutubeStream)

  def approx_duration
    approx_duration_ms / 1000.0
  end

  def width
    streams.map(&:width).max
  end

  def height
    streams.map(&:height).max
  end
end