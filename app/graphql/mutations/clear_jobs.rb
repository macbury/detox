module Mutations
  class ClearJobs < SimpleMutation
    null true
    description 'Clear not running jobs'

    argument :job_ids, [ID], required: true

    field :deleted, Integer, null: true

    def resolve(job_ids:)
      authorize! AsyncJob::JobBlueprint, to: :destroy?, with: BackgroundJobsPolicy

      {
        deleted: AsyncJob.jobs.not_running.where(id: job_ids).destroy_all.size
      }
    end
  end
end