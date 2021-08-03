class DetoxSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)
  subscription(Types::SubscriptionType)
  # subscription(Types::SubscriptionType)

  # Opt in to the new runtime (default in future graphql-ruby versions)
  # use GraphQL::Execution::Interpreter
  # use GraphQL::Analysis::AST

  # Add built-in connections for pagination
  # use GraphQL::Pagination::Connections
  # use GraphQL::Execution::Errors
  use GraphQL::Subscriptions::ActionCableSubscriptions
  use GraphQL::Backtrace unless Rails.env.production?

  rescue_from ActiveRecord::RecordNotFound do |exception|
    Rails.logger.error "RecordNotFound: #{exception}"
    nil
  end

  rescue_from ActionPolicy::Unauthorized do |exception, _obj, _args, ctx|
    Rails.logger.error "Unauthorized: #{exception}"
    raise GraphQL::ExecutionError.new(
      exception.result.message,
      extensions: {
        code: :unauthorized,
        signedIn: ctx[:current_user].present?,
        fullMessages: exception.result.reasons.full_messages,
        details: exception.result.reasons.details
      }
    )
  end

  rescue_from ServiceFailure do |exception|
    Rails.logger.error "Service Failure: #{exception}"
    { errors: [exception.to_s] }
  end

  rescue_from ActiveRecord::RecordInvalid do |exception|
    Rails.logger.error "Validation error: #{exception}"
    { errors: exception.record.errors.full_messages }
  end
end
