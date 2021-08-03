module Extract
  module Youtube
    # Get video data for passed youtube id
    # Based on code from
    #
    # - https://github.com/ytdl-org/youtube-dl/blob/5208ae92fc3e2916cdccae45c6b9a516be3d5796/youtube_dl/extractor/youtube.py#L1477
    # - https://github.com/iv-org/invidious/blob/8ed1c77e47d489637bebc48e556a4ca525bbd65d/src/invidious/videos.cr#L969
    # - https://github.com/TeamNewPipe/NewPipe
    # - https://github.com/iv-org/invidious/blob/8ed1c77e47d489637bebc48e556a4ca525bbd65d/src/invidious/videos.cr#L553
    # - https://github.com/iv-org/invidious/blob/8ed1c77e47d489637bebc48e556a4ca525bbd65d/src/invidious/videos.cr#L572
    # - https://github.com/TeamNewPipe/NewPipeExtractor/blob/1925dcf4dc30a662ed8345573037d54c46b51f19/extractor/src/main/java/org/schabi/newpipe/extractor/services/youtube/extractors/YoutubeStreamExtractor.java#L802
    #
    class VideoData < Service
      use Channels::Youtube::CookiesHeader, as: :youtube_cookies_header
      use Download::Get, as: :download

      INITIAL_PLAYER_RESPONSE = /ytInitialPlayerResponse\s*=\s*({.+?})\s*;/i

      def initialize(youtube_id)
        @youtube_id = youtube_id
      end

      # @return [YotubeStream]
      def call
        JSON.parse(page_body.match(INITIAL_PLAYER_RESPONSE)[1])
      rescue Exception, KeyError => e
        raise ServiceFailure, "Could not find key: #{e}"
      end

      private

      attr_reader :youtube_id

      def page_body
        @page_body ||= download(
          url: "https://www.youtube.com/watch?v=#{youtube_id}", 
          headers: headers
        )
      end

      def headers
        {
          'referrer' => "https://www.youtube.com/"
        }.merge(youtube_cookies_header)
      end
    end
  end
end