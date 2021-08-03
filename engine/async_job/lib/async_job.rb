require "async_job/engine"
require "async_job/controller"
require "async_job/powerup"
require "active_job/queue_adapters/async_job_adapter"

module AsyncJob
  def self.jobs
    JobBlueprint.all
  end
end
