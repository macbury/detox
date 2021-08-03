module Resolvers
  class BackgroundJobs < Base
    include SearchObject.module(:graphql)

    description 'Get processed background jobs'

    scope do
      AsyncJob::JobBlueprint.all
    end

    type Types::AsyncJob::JobBlueprintConnectionType, null: false

    option(:kind, type: Types::AsyncJob::JobKindType, required: true)

    def apply_kind_with_all(scope)
      scope
    end

    def apply_kind_with_processing(scope)
      scope.processing
    end

    def apply_kind_with_bench(scope)
      scope.waiting_to_execute
    end

    def apply_kind_with_with_errors(scope)
      scope.with_errors
    end
  end
end