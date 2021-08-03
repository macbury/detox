class AddThrottleKeyToAsyncJobJobBlueprints < ActiveRecord::Migration[6.1]
  def change
    add_column :async_job_job_blueprints, :throttle_key, :string, default: nil
  end
end
