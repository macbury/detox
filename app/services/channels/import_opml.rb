module Channels
  class ImportOpml < Service
    use Channels::Opml::Parse, as: :prase_opml
    use Channels::Create, as: :create_channel

    def initialize(content:, user:)
      @content = content
      @user = user
    end

    def call
      opml_feeds.each do |opml_feed|
        create_channel(
          source: opml_feed.url,
          kind: :rss,
          user: user
        )
      end
    end

    attr_reader :content, :user

    private

    def opml_feeds
      @opml_feeds ||= prase_opml(content).values.flatten
    end
  end
end