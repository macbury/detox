module Types
  module AsyncJob
    class JobBlueprintConnectionType < GraphQL::Types::Relay::BaseConnection
      edge_type(JobBlueprintEdgeType)

      field :total_count, Integer, null: false

      def total_count
        object.nodes.size
      end
    end
  end
end