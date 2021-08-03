# This job is just used to be able to schedule multiple jobs in future without lock key
class ScheduledRefreshChannelJob < ApplicationJob
  def perform(channel_id)
    RefreshChannelJob.perform_later(channel_id)
  end
end