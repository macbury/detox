module Scheduler
  # Snaps value to time slot. For example 15 hours, 39 minutes, and 28.555051 seconds will be snapped to 15 hours and 40 minutes
  class DurationToSlot < Service
    TIME_SLOT = 10.minutes
    attr_reader :duration

    def initialize(duration)
      @duration = duration
    end

    def call
      ActiveSupport::Duration.build((duration.to_f / TIME_SLOT.to_f).round * TIME_SLOT)
    end
  end
end