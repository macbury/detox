class OpmlFeed < Dry::Struct
  attribute :name, Types::String
  attribute :url, Types::String
end
