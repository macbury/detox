require_relative '../../../lib/feedbag.rb'

module Channels
  # This service tries to guess if passed url is RSS, twitter, facebook etc and returns url with kind
  class Discovery < Service
    use Proxy::ResolveUrl, as: :resolve_url
    use Channels::TypeFromUrl, as: :type_from_url
    use Channels::Rss::DiscoverFeeds, as: :discover_rss
    use Channels::Youtube::Discover, as: :discover_youtube
    use Channels::Twitter::Discover, as: :discover_twitter

    def initialize(url:)
      @url = url.strip
    end

    def call
      append_protocol!
      info "Type for url: #{url} is #{type}"

      case type
      when :youtube
        [discover_youtube(youtube_url: url)].compact
      when :twitter
        [discover_twitter(twitter_url: url)].compact
      else
        discover_rss(url)
      end
    end

    private

    attr_reader :url

    def append_protocol!
      return if url.match?(/\Ahttp[s]{0,1}:\/\//i)

      @url = resolve_url("https://#{@url}")
    end

    def type
      @type ||= type_from_url(url)
    end
  end
end