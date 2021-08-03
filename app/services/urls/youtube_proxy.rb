module Urls
  # Change social media urls to be proxied using our server
  # Current supported is:
  #   - Youtube - transform https://www.youtube.com/watch?v=TktWPc9AJkU into /proxy/youtube/video/TktWPc9AJkU
  class YoutubeProxy < Service
    use Security::SignUrl, as: :sign_url

    def initialize(doc)
      @doc = doc.is_a?(String) ? Nokogiri::HTML.fragment(doc) : doc
    end

    def call
      MEDIA_TAGS_WITH_URLS.each do |tag, attr|
        doc.css("#{tag}[#{attr}]").each do |node|
          transform_to_youtube_video_tag(node, attr)
        end
      end

      doc
    end

    private

    attr_reader :content, :doc

    def transform_to_youtube_video_tag(node, attr)
      url = node.get_attribute(attr)
      youtube_id = YoutubeID.from(url)

      return unless youtube_id

      throw "Error reimplement this"
      poster = Rails.application.routes.url_helpers.proxy_media_path(sign_url("https://i3.ytimg.com/vi/#{youtube_id}/maxresdefault.jpg").to_h)

      node.replace("<video data-youtube-id=#{youtube_id} controls poster=#{poster} src=#{src.inspect}></video>")
    end
  end
end