# This type is used for describing
class PosterMetaData < Dry::Struct
  transform_keys(&:to_sym)

  attribute :url, Types::String
  attribute :width, Types::Integer
  attribute :height, Types::Integer
  attribute :resolution, Types::Integer
  attribute :blurhash?, Types::String.optional
end