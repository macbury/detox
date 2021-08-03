module Scheduler
  # Remove from DateTime date part and just get time in form of duration
  class DateToLocalDuration < Service
    attr_reader :date

    def initialize(date)
      @date = date
    end

    def call
      seconds = date - date.at_beginning_of_day
      ActiveSupport::Duration.build(seconds)
    end
  end
end