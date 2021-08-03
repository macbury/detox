module Types
  module AsyncJob
    class JobKindType < Types::BaseEnum
      graphql_name 'JobKind'

      value 'All', value: :all
      value 'Bench', value: :bench
      value 'WithErrors', value: :with_errors
      value 'Processing', value: :processing
    end
  end
end
