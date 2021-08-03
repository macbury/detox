module Sanitizer
  # Cleanup only offensive tags, and stuff that could be dangerous
  # remove utm tracking from source
  # change all urls for img, audio, video to be proxied through rails app
  # transform youtube,facebook,instagram,twitter iframes, url into video tag pointing into local proxy
  # youtube should for beginning only redirect
  class Story < Service
    use Urls::ExpandDynamicImages, as: :expand_dynamic_images_in
    use Urls::ExpandAbsolute, as: :expand_urls_in
    use Urls::ThroughProxy, as: :src_through_proxy_in
    # use Urls::YoutubeProxy, as: :change_youtube_iframes_in
    use RemoveSvgPlaceholders, as: :remove_svg_placeholders
    use ModifyLinks, as: :modify_urls_in
    use CacheImageSizeAndBlurhash, as: :cache_image_size_and_blurhash_in

    def initialize(content, base_url: nil)
      @content = content
      @base_url = base_url
      @sanitizer = Rails::Html::SafeListSanitizer.new
      @scrubber = Scrubber.new
    end

    def call
      remove_svg_placeholders(document)
      expand_dynamic_images_in(document)
      expand_urls_in(document, base_url)
      src_through_proxy_in(document)
      #change_youtube_iframes_in(document)
      modify_urls_in(document)
      make_content_safe
      cache_image_size_and_blurhash_in(document)

      result_html
    end

    private

    attr_reader :content, :sanitizer, :base_url, :scrubber

    def document
      @document ||= Nokogiri::HTML.fragment(content)
    end

    def make_content_safe
      @document = Nokogiri::HTML.fragment(sanitizer.sanitize(
        result_html,
        scrubber: scrubber
      ).strip)
    end

    def result_html
      CGI.unescapeHTML(document.to_html)
    end
  end
end