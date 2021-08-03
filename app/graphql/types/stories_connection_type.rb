module Types
  class StoriesConnectionType < GraphQL::Types::Relay::BaseConnection
    edge_type(StoryEdgeType)

    field :total_count, Integer, null: false

    def total_count
      object.nodes.unscope(:order, :limit).count
    end
  end
end