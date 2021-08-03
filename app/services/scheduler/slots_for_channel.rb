module Scheduler
  # By analizing date of publication for last 100 entries, we try to guess times on which we should run sidekiq job that fetches new entry
  class SlotsForChannel < Service
    MIN_NUMBER_OF_REPETITION = 3
    NUMBER_OF_STORIES_TO_ANALYZE = 100

    use DateToLocalDuration, as: :date_to_local_duration
    use DurationToSlot, as: :duration_to_slot

    def initialize(channel)
      @channel = channel
    end

    def call
      groupped_slots.reject { |slot, matched_dates| matched_dates.size >= MIN_NUMBER_OF_REPETITION }.keys
    end

    private

    attr_reader :channel

    # List of stories publication time for analyze
    def publication_history
      @publication_history ||= channel
        .stories
        .for_current_day_of_week
        .order('published_at DESC')
        .limit(NUMBER_OF_STORIES_TO_ANALYZE)
        .pluck(:published_at)
    end

    # Key value hash with slot time for key and array of matched dates for value
    def groupped_slots
      @groupped_slots ||= publication_history.group_by do |published_at|
        time_of_day = date_to_local_duration(published_at)
        duration_to_slot(time_of_day)
      end
    end
  end
end