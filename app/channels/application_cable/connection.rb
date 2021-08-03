module ApplicationCable
  class Connection < ActionCable::Connection::Base
    extend Usable
    identified_by :current_session
    use Auth::AuthWithToken, as: :authenticate_with_token

    def connect
      @current_session = authenticate_with_token(param_token || cookie_token)
      Rails.logger.info "Cookie token: #{cookie_token.inspect}"
      Rails.logger.info "Param token: #{param_token.inspect}"

      if @current_session
        self.current_session = @current_session
        logger.add_tags 'ActionCable', "Session: #{current_session.id}"
      else
        logger.add_tags 'ActionCable', 'Guest'
        reject_unauthorized_connection
      end
    end

    def disconnect
      logger.info "Session closed"
    end

    def cookie_token
      cookies['access-token']
    end

    def param_token
      request.params['token']
    end
  end
end