module Channels
  # Detect channel kind from passed url. If nothing is matched then rss is returned
  class TypeFromUrl < Service
    REGEXP_TO_TYPE = {
      /youtube.com\/user\/(.+)/i => :youtube,
      /youtube.com\/c\/(.+)/i => :youtube,
      /youtube.com\/channel\/(.+)/i => :youtube,
      /youtube.com\/feeds\/videos\.xml\?channel_id=/i => :youtube,
      /twitter.com/i => :twitter
    }.freeze

    attr_reader :url

    def initialize(url)
      @url = url
    end

    def call
      REGEXP_TO_TYPE.each do |regexp, type|
        return type if url.match(regexp)
      end

      :rss
    end
  end
end