class DiscoveredChannel < Dry::Struct
  attribute :title, Types::String
  attribute :url, Types::String
  attribute :kind, Types::String
  attribute :source, Types::String
  attribute :icon_url, Types::String.optional
end
