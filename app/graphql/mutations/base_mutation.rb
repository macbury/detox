module Mutations
  class BaseMutation < GraphQL::Schema::RelayClassicMutation
    include ActionPolicy::GraphQL::Behaviour
    extend Usable

    argument_class Types::BaseArgument
    field_class Types::BaseField
    input_object_class Types::BaseInputObject
    object_class Types::BaseObject

    def current_user
      context[:current_user] || User.new
    end

    def current_session
      context[:current_session]
    end
  end
end
