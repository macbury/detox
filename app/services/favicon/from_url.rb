module Favicon
  # Depending on type of url extract page favicon or profile icon
  class FromUrl < Service
    use Channels::TypeFromUrl, as: :type_from_url
    use FromYoutube, as: :from_youtube
    use FromWebpage, as: :from_webpage
    use FromTwitter, as: :from_twitter

    def initialize(url)
      @url = url
    end

    def call
      case type
      when :twitter
        from_twitter(url)
      when :youtube
        from_youtube(url)
      else
        from_webpage(url)
      end
    end

    private

    attr_reader :url

    def type
      @type ||= type_from_url(url)
    end
  end
end