module Extract
  module Youtube
    # https://github.com/TeamNewPipe/NewPipeExtractor/blob/1925dcf4dc30a662ed8345573037d54c46b51f19/extractor/src/main/java/org/schabi/newpipe/extractor/services/youtube/extractors/YoutubeStreamExtractor.java#L810
    # Visit embed page for youtube vide
    # find script with name like /s/player/.*/player_ias.vflset/.*/base.js
    # download its content
    # in script find text like sts="18730"
    class PlayerSts < Service
      PLAYER_SCRIPT = /player_ias/i
      SCRIPT_STS = /sts="(\d+)"/i

      use Download::Get, as: :download

      def initialize(youtube_id, headers: {})
        @youtube_id = youtube_id
        @embed_url = "https://www.youtube.com/embed/#{youtube_id}"
        @headers = {}
      end

      def call
        Rails.cache.fetch('youtube/sts_number', expires_in: 1.hour) do
          raise ServiceFailure, "Could not find player script url: #{embed_url}" unless player_script_node

          sts = player_script.match(SCRIPT_STS)[1]
          raise ServiceFailure, "Could not find sts number in player script: #{player_script_url}" unless sts

          sts
        end
      end

      private

      attr_reader :youtube_id, :embed_url

      def embed_page_doc
        @embed_page_doc ||= Nokogiri::HTML.fragment(embed_page)
      end

      def embed_page
        @embed_page ||= download(url: embed_url, html: true, headers: headers)
      end

      def player_script_node
        @player_script_node ||= embed_page_doc.search('script').find { |script| script[:src]&.match(PLAYER_SCRIPT) }
      end

      def player_script_url
        "https://youtube.com#{player_script_node[:src]}"
      end

      def player_script
        @player_script ||= download(url: player_script_url, headers: headers)
      end

      def headers
        {
          'referrer' => "https://www.youtube.com/embed/#{youtube_id}"
        }.merge(@headers)
      end
    end
  end
end