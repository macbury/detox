module Auth
  # Constraint used in routes.rb to ensure that admin has access to resource
  class AdminConstraint < Service
    use Auth::AuthWithToken, as: :authenticate_with_token

    def initialize(request)
      @request = request
    end

    def call
      @access_token = request.params.fetch(:token, '').gsub('@', '.')
      @refresh_token = authenticate_with_token(@access_token)
      @refresh_token&.user&.admin?
    end

    private

    attr_reader :request
  end
end