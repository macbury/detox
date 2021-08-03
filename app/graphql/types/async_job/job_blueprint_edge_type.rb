module Types
  module AsyncJob
    class JobBlueprintEdgeType < GraphQL::Types::Relay::BaseEdge
      node_type(JobBlueprintType)
    end
  end
end