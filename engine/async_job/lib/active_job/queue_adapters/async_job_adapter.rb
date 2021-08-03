module ActiveJob # :nodoc:
  module QueueAdapters # :nodoc:
    # https://github.com/rails/rails/blob/fbe2433be6e052a1acac63c7faf287c52ed3c5ba/activejob/lib/active_job/queue_adapters/sidekiq_adapter.rb
    class AsyncJobAdapter
      # Enqueues the ActiveJob job to be performed.
      # For use by Rails; you should generally not call this directly.
      # @param active_job [ActiveJob::Base] the job to be enqueued from +#perform_later+
      # @return [ActiveJob::Job]
      def enqueue(active_job)
        enqueue_at(active_job, nil)
      end

      # Enqueues an ActiveJob job to be run at a specific time.
      # For use by Rails; you should generally not call this directly.
      # @param active_job [ActiveJob::Base] the job to be enqueued from +#perform_later+
      # @param timestamp [Integer] the epoch time to perform the job
      # @return [ActiveJob::Job]
      def enqueue_at(active_job, timestamp)
        lock_key = active_job.lock_key(*active_job.arguments)
        throttle_key = active_job.throttle_key(*active_job.arguments)

        if lock_key
          return false if AsyncJob::JobBlueprint.without_errors.exists?(lock_key: lock_key)
        end

        async_job = AsyncJob::JobBlueprint.new(
          serialized_params: active_job.serialize,
          run_at: Time.zone.at(timestamp || Time.zone.now),
          job_class: active_job.class,
          lock_key: lock_key,
          throttle_key: throttle_key,
          priority: active_job.priority || 0
        )

        async_job.save!
        active_job.provider_job_id = async_job.id
        async_job
      end
    end
  end
end