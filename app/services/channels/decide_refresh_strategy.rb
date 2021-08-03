module Channels
  # Decide what strategy for fetching entries should be done depending on Channel kind
  class DecideRefreshStrategy < Service
    use Channels::Twitter::Refresh, as: :refresh_twitter
    use Channels::Rss::Refresh, as: :refresh_rss
    use Channels::UpdateIcon, as: :update_icon

    def initialize(channel)
      @channel = channel
    end

    def call
      channel.refreshing!
      channel.cleanup_stories!

      update_icon(channel) unless channel.icon_data

      if channel.twitter?
        refresh_twitter(channel)
      elsif rss?
        refresh_rss(channel)
      else
        raise ServiceFailure, "Kind #{channel.kind} is not supported, Cannot refresh channel: #{channel.source}"
      end

      success!
    rescue ServiceFailure => e
      failure!(e)
    end

    private

    attr_reader :channel

    def rss?
      channel.rss? || channel.youtube?
    end

    def success!
      channel.update!(
        last_check_at: Time.zone.now,
        status: :refreshed,
        error: nil
      )
    end

    def failure!(error)
      channel.update!(
        last_check_at: Time.zone.now,
        status: :error,
        error: error
      )
    end
  end
end