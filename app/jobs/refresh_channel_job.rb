class RefreshChannelJob < ApplicationJob
  use Channels::DecideRefreshStrategy, as: :decide_refresh_strategy

  def perform(channel_id)
    channel = Channel.not_archived.find(channel_id)

    decide_refresh_strategy(channel)
  end

  def lock_key(channel_id)
    "RefreshChannel:#{channel_id}"
  end

  def timeout_after
    10.minutes
  end
end