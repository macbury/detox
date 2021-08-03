module Extract
  module Youtube

    class Streams < Service
      use VideoData, as: :get_video_data

      def initialize(youtube_id, data: nil)
        @youtube_id = youtube_id
        @data = data
      end

      # @return [YotubeStream]
      def call
        formats.map do |data|
          stream = YoutubeStream.new(data.symbolize_keys)
          info "Found quality #{stream.quality} for #{youtube_id}"
          stream
        rescue Dry::Struct::Error => e
          error "Could not create YoutubeStream for #{youtube_id} because #{e}"
          nil
        end.compact.sort
      rescue Exception, KeyError => e
        raise ServiceFailure, "Could not find key: #{e}"
      end

      private

      attr_reader :youtube_id

      def data
        @data ||= get_video_data(youtube_id)
      end

      def formats
        # TODO: handle adaptiveFormats?
        @formats ||= data.fetch('streamingData', {}).slice('formats').values.flatten.map { |format| format.transform_keys(&:underscore) }
      end
    end
  end
end