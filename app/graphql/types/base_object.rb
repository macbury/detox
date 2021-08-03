module Types
  class BaseObject < GraphQL::Schema::Object
    include ActionPolicy::GraphQL::Behaviour
    extend Usable
    field_class Types::BaseField

    def current_user
      context[:current_user] || User.new
    end
  end
end
