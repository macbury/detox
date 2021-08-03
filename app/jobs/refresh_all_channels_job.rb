# Refresh all not archived channels
class RefreshAllChannelsJob < ApplicationJob
  def perform
    last_refreshed_channels_ids.each do |channel_id|
      RefreshChannelJob.perform_later(channel_id)
    end
  end

  def lock_key
    'RefreshAllChannelsJob'
  end

  private

  def last_refreshed_channels_ids
    @last_refreshed_channels_ids ||= Channel.not_archived.left_outer_joins(:stories).order('stories.created_at DESC').uniq.pluck(:id)
  end
end