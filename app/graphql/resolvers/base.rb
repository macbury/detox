require 'search_object'
require 'search_object/plugin/graphql'

module Resolvers
  class Base < GraphQL::Schema::Resolver
    include ActionPolicy::GraphQL::Behaviour

    def current_user
      context[:current_user] || User.new
    end
  end
end