class ScheduleForChannelsJob < ApplicationJob
  use Scheduler::SlotsForChannel, as: :slots_for_channel

  def perform
    Channel.not_archived.find_each do |channel|
      slots_for_channel(channel).each do |refresh_time_slot|
        run_at = DateTime.now.at_beginning_of_day + 1.minute + refresh_time_slot

        ScheduledRefreshChannelJob.set(wait_until: run_at).perform_later(channel.id) if run_at.future?
      end
    end
  end
end