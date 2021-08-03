class Subscriptions::BaseSubscription < GraphQL::Schema::Subscription
  include ActionPolicy::GraphQL::Behaviour
  # Hook up base classes
  object_class Types::BaseObject
  field_class Types::BaseField
  argument_class Types::BaseArgument

  def current_user_id
    current_user.id
  end

  def current_user
    context[:current_user] || User.new
  end

  def current_session
    context[:current_session]
  end

  def current_session_id
    current_session.id
  end
end