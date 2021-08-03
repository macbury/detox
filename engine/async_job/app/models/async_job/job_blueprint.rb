module AsyncJob
  class JobBlueprint < ApplicationRecord
    scope :only_scheduled, -> { where('run_at <= ? OR run_at IS NULL', Time.zone.now) }
    scope :unfinished, -> { where(locked_at: nil) }
    scope :highest_priority, -> { order(priority: :desc) }
    scope :oldest, -> { order(run_at: :asc) }
    scope :without_errors, -> { where(error: nil) }
    scope :with_errors, -> { where.not(error: nil) }
    scope :failed, -> { where('error IS NOT NULL') }
    scope :running, -> { where('locked_at IS NOT NULL') }
    scope :processing, -> { where.not(locked_at: nil) }
    scope :not_running, -> { where(locked_at: nil) }

    scope :waiting_to_execute, -> { without_errors.unfinished.highest_priority.oldest }
    scope :ready_to_execute, -> { waiting_to_execute.only_scheduled }
    scope :expired, -> { running.where('locked_at <= ?', 1.hour.ago) }

    def to_job
      ActiveJob::Base.deserialize(serialized_params)
    end
  end
end
