require 'socket'
require 'async/container'
require 'async/container/notify'
require 'async/semaphore'
require 'async/clock'
require 'async/http/internet'
require 'active_job/callbacks'
require 'rufus-scheduler'

module AsyncJob
  class Controller < Async::Container::Controller
    attr_reader :locker_name

    def initialize(concurrency:, schedule: {}, workers: 1)
      super(notify: Async::Container::Notify.open!)

      @locker_name = [Process.pid, Socket.gethostname].join('@')
      @concurrency = concurrency
      @workers = workers
      @schedule = schedule
      @semaphore = Async::Semaphore.new(concurrency)

      prepare_scheduler
    end

    def setup(container)
      Async.logger.info "Process name: #{locker_name}"
      container.run(count: workers, restart: false) do |instance|
        container.async do |task|
          main_loop(task)
        end

        instance.ready!
      end
    end

    def prepare_scheduler
      @scheduler ||= Rufus::Scheduler.new

      schedule&.each do |class_name, cron|
        klass = class_name.safe_constantize

        if klass
          job = @scheduler.cron cron, job: true do
            klass.perform_later
          end

          Async.logger.info "Added #{klass} to schedule using cron: #{cron} and will be run at: #{job.next_time}"
        else
          Async.logger.error "Could not find class: #{klass} for scheduler"
        end
      end
    end

    def cleanup
      jobs_cleaned_up = AsyncJob::JobBlueprint.where(locked_by: locker_name).update_all(
        locked_at: nil,
        locked_by: nil,
        error: nil,
        backtrace: nil
      )
      Async.logger.error "Pushed #{jobs_cleaned_up} jobs back to bench" unless jobs_cleaned_up.zero?
    end

    private

    attr_reader :concurrency, :workers, :schedule, :semaphore

    def update_title
      Process.setproctitle "AsyncJob [#{semaphore.count} of #{semaphore.limit}]"
    end

    def main_loop(task)
      task.logger.info "Started, max concurrency is: #{concurrency}"

      loop do
        unless perform_next_job
          task.logger.info "Waiting for jobs on bench #{job_queue.count}/#{total_jobs_count}" if (Time.zone.now.to_i % 1.minute).zero?
          task.sleep(1)
        else
          task.logger.info "Running: #{semaphore.count}/#{semaphore.limit}, Jobs left: #{job_queue.count}/#{total_jobs_count}"
        end

        update_title
      end
    end

    def job_queue
      JobBlueprint.ready_to_execute.where.not(throttle_key: running_throttled_jobs)
    end

    def total_jobs_count
      JobBlueprint.without_errors.count
    end

    def running_throttled_jobs
      AsyncJob::JobBlueprint.running.without_errors.where.not(throttle_key: nil).uniq.pluck(:throttle_key)
    end

    def perform_next_job
      return false if semaphore.blocking?

      job_blueprint = job_queue.first

      return false unless job_blueprint

      job_blueprint.update!(
        locked_at: Time.zone.now,
        locked_by: locker_name,
        error: nil,
        backtrace: nil
      )

      semaphore.async do |task|
        execute_job(job_blueprint, task)
      end

      true
    end

    def execute_job(job_blueprint, task)
      ActiveJob::Callbacks.run_callbacks(:execute) do
        job = job_blueprint.to_job
        raise "#{job.class} should import AsyncJob::Powerup module" unless job.is_a?(AsyncJob::Powerup)

        job.task = task
        task.logger.info "Starting: #{job.class} with id: #{job_blueprint.id}"

        result = nil

        duration = Async::Clock.measure do
          task.with_timeout(job.timeout_after) do
            result = job.perform_now
          end
        end

        if result.is_a?(Exception)
          task.logger.error "Failed: #{job.class} with id: #{job_blueprint.id} reason: #{result}, it will be retried in future, left #{semaphore.count - 1} in queue"
        else
          task.logger.info "Completed #{job.class} after #{duration.round(2)}s with id: #{job_blueprint.id}, left #{semaphore.count - 1} in queue"
        end

        job_blueprint.destroy
      rescue => e
        handle_job_error(job_blueprint, e)
      end
    end

    def handle_job_error(job_blueprint, error)
      Async::Task.current.logger.error "Broken job: #{job_blueprint.job_class} with id: #{job_blueprint.id} reason: #{error}\n#{error.backtrace.join("\n")}"

      job_blueprint.update!(
        locked_at: nil,
        locked_by: nil,
        error: "[#{error.class}] #{error.to_s}",
        backtrace: error.backtrace.join("\n")
      )
    end
  end
end