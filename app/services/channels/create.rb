module Channels
  class Create < Service
    use Channels::Rss::Fetch, as: :fetch_rss
    use Channels::Youtube::Fetch, as: :fetch_youtube
    use Channels::UpdateIcon, as: :update_icon

    def initialize(source:, kind:, user:)
      @source = source
      @user = user
      @kind = kind.to_sym
    end

    def call
      Channel.transaction do
        @channel = user.channels.find_or_initialize_by(kind: kind, source: source)
        fetch_channel_by_kind(@channel)
        @channel.pending!
        update_icon(@channel)
      end

      RefreshChannelJob.perform_later(@channel.id)
      RefreshPubsubSubscriptionsJob.perform_later if @channel.youtube?

      @channel
    end

    private

    attr_reader :source, :kind, :user

    def fetch_channel_by_kind(channel)
      case kind
      when :rss
        fetch_rss(channel)
      when :youtube
        fetch_youtube(channel)
      else
        raise "Kind #{kind} is not supported, Cannot create channel: #{source}"
      end
    end
  end
end