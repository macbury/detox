module Resolvers
  class GetBackgroundJob < Base
    type Types::AsyncJob::JobBlueprintType, null: true
    description 'Get one background job'

    argument :id, ID, required: true

    def resolve(id:)
      AsyncJob::JobBlueprint.find(id)
    end
  end
end
