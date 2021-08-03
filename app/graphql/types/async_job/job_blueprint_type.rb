module Types
  module AsyncJob
    class JobBlueprintType < Types::BaseObject
      field :id, ID, null: false

      field :created_at, GraphQL::Types::ISO8601DateTime, null: false
      field :run_at, GraphQL::Types::ISO8601DateTime, null: true
      field :locked_at, GraphQL::Types::ISO8601DateTime, null: true

      field :error, String, null: true
      field :backtrace, String, null: true
      field :priority, Integer, null: false
      field :lock_key, String, null: true
      field :job_class, String, null: false
      field :arguments, [String], null: false

      def arguments
        object.serialized_params['arguments']
      end
    end
  end
end
