module Auth
  # Generate access token from passed JWT token with refresg tijeb
  class RefreshAccessToken < Service
    use GetRefreshToken, as: :get_refresh_token

    def initialize(token, expire_at = nil)
      @token = token
      @expire_at = expire_at
    end

    def call
      return unless refresh_token

      TokenScopes.access_token(refresh_token, expire_at: expire_at)
    rescue ActiveRecord::RecordNotFound
      nil
    end

    private

    attr_reader :token, :expire_at

    def refresh_token
      @refresh_token ||= get_refresh_token(token)
    end
  end
end