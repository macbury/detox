module Mutations
  class SimpleMutation < GraphQL::Schema::Mutation
    include ActionPolicy::GraphQL::Behaviour
    extend Usable

    def current_user
      context[:current_user] || User.new
    end
  end
end
