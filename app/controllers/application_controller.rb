class ApplicationController < ActionController::API
  extend Usable

  include ActionController::MimeResponds
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ActionController::Cookies

  use Auth::AuthWithToken, as: :authenticate_with_token
  around_action :use_async

  attr_reader :current_session

  def authenticate!
    if params.key?(:token)
      Rails.logger.debug "Params Access token is: #{token_param}"
      @current_session = authenticate_with_token(token_param)
    else
      authenticate_with_http_token do |access_token, _options|
        #Rails.logger.debug "Header Access token is: #{access_token}"
        @current_session = authenticate_with_token(access_token)
      end
    end

    @current_session ||= authenticate_with_token(cookies['access-token']) if cookies.key?('access-token')
  end

  def current_user
    current_session ? current_session.user : super
  end

  def token_param
    params.require(:token)
  end

  def use_async
    Async::Task.current.with_timeout(1.minute) do
      yield
    end
  end
end
