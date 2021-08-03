class PageMetadata < Dry::Struct
  attribute :title, Types::String
  attribute :description, Types::String.optional
  attribute :image, Types::String.optional
end
