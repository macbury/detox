class AddLockedByToJobs < ActiveRecord::Migration[6.1]
  def change
    add_column :async_job_job_blueprints, :locked_by, :string, default: nil
  end
end
