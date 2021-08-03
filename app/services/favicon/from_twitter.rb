module Favicon
  class FromTwitter < Service
    use Channels::Twitter::Fetch, as: :download_feed
    use Channels::Twitter::GetUserHandler, as: :get_handler

    def initialize(url)
      @url = url
      @username = get_handler(url)
    end

    def call
      return unless username

      profile_image_url = users.find { |user| user.fetch('screen_name').downcase === username }&.fetch('profile_image_url_https', nil)
      profile_image_url&.gsub('_normal', '_200x200')
    end

    private

    attr_reader :url, :username

    def users
      @users ||= download_feed(username).dig('globalObjects', 'users').values
    end
  end
end