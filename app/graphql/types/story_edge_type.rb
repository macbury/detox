module Types
  class StoryEdgeType < GraphQL::Types::Relay::BaseEdge
    node_type(StoryType)
  end
end