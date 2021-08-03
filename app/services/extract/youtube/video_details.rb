module Extract
  module Youtube
    class VideoDetails < Service
      use Streams, as: :get_streams
      use VideoData, as: :get_video_data

      def initialize(youtube_id)
        @youtube_id = youtube_id
      end

      # @return YoutubeVideo
      def call
        YoutubeVideo.new({
          id: youtube_id,
          title: title,
          description: description,
          approx_duration_ms: approx_duration_ms,
          poster_url: poster_url,
          uri: "https://www.youtube.com/watch?v=#{youtube_id}",
          streams: get_streams(youtube_id, data:  data)
        })
      rescue Exception, KeyError => e
        raise ServiceFailure, "Could not find key: #{e}"
      end

      private

      attr_reader :youtube_id

      def data
        @data ||= get_video_data(youtube_id)
      end

      def approx_duration_ms
        data.dig('streamingData', 'formats', 0, 'approxDurationMs')
      end

      def description
        data.dig('microformat', 'playerMicroformatRenderer', 'description', 'simpleText')
      end

      def title
        data.dig('microformat', 'playerMicroformatRenderer', 'title', 'simpleText')
      end

      def poster_url
        data.dig('microformat', 'playerMicroformatRenderer', 'thumbnail', 'thumbnails', 0, 'url')
      end
    end
  end
end