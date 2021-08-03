module Channels
  module Youtube
    # Find youtube video preview
    class FindPreview < Service
      QUALITY = [
        'maxresdefault',
        'hqdefault',
        'high',
        'sddefault',
        'maxresdefault'
      ].freeze

      use Extract::ImageDetails, as: :get_image_details

      attr_reader :youtube_id

      def initialize(youtube_id)
        @youtube_id = youtube_id
      end

      def call
        # TODO use Async::Each to parellize?
        QUALITY.each do |quality|
          poster = get_image_details("https://i3.ytimg.com/vi/#{youtube_id}/#{quality}.jpg")

          return poster if poster
        end
      end
    end
  end
end