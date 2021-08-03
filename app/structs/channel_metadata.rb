class ChannelMetadata < Dry::Struct
  attribute :title, Types::String
  attribute :site_url, Types::String
  attribute :kind, Types::String
  attribute :source, Types::String
  attribute :icon_url, Types::String
  attribute :id, Types::String
  attribute :description, Types::String
end
