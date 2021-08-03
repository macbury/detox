class GraphqlController < ApplicationController
  before_action :authenticate!, :inform_about_client!

  def execute
    render json: DetoxSchema.execute(params[:query], **args_for(params))
  rescue StandardError => e
    raise e unless Rails.env.development?

    handle_error_in_development e
  end

  private

  def args_for(params)
    {
      variables: ensure_hash(params[:variables]),
      query: params[:query],
      operation_name: params[:operationName],
      context: {
        ip: request.ip,
        current_user: current_user,
        current_session: current_session,
        request: request,
        response: response,
        sign_in: method(:sign_in),
        sign_out: method(:sign_out)
      }
    }
  end

  def inform_about_client!
    client = request.headers['via-client'] || 'unknown'
    Rails.logger.info "Executed via: #{client}"
  end

  # Handle form data, JSON body, or a blank value
  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      if ambiguous_param.present?
        ensure_hash(JSON.parse(ambiguous_param))
      else
        {}
      end
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end

  def handle_error_in_development(e)
    logger.error e.message
    logger.error e.backtrace.join("\n")

    render json: { errors: [{ message: e.message, backtrace: e.backtrace }], data: {} }, status: 500
  end
end
