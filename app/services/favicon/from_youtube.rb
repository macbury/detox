module Favicon
  class FromYoutube < Service
    use Channels::Youtube::Download, as: :download_channel

    def initialize(url)
      @url = url
    end

    def call
      download_channel(youtube_url: url)&.icon_url
    end

    private

    attr_reader :url
  end
end