module AsyncJob
  # Extend job with additional features, to make async job work
  module Powerup
    extend ActiveSupport::Concern

    included do
      retry_on Async::Stop, wait: 10.seconds
    end

    attr_accessor :task

    # Get unique lock key to check if job should be added second time to queue
    def lock_key(*arguments)
      nil
    end

    # unique key, that ensures only one job of this type is running at once
    def throttle_key(*arguments)
      nil
    end

    def timeout_after
      1.hour
    end
  end
end