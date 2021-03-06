class ApplicationJob < ActiveJob::Base
  extend Usable
  include AsyncJob::Powerup
  # Automatically retry jobs that encountered a deadlock
  # retry_on ActiveRecord::Deadlocked

  # Most jobs are safe to ignore if the underlying records are no longer available
  # discard_on ActiveJob::DeserializationError

  def timeout_after
    5.minutes
  end
end
