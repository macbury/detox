class CreateAsyncJobJobs < ActiveRecord::Migration[6.0]
  def change
    create_table :async_job_job_blueprints do |t|
      t.json :serialized_params
      t.datetime :run_at
      t.datetime :locked_at
      t.string :job_class
      t.string :error
      t.text :backtrace
      t.integer :priority, default: 0
      t.string :lock_key

      t.timestamps
    end

    add_index :async_job_job_blueprints, [:run_at, :error, :priority]
    add_index :async_job_job_blueprints, [:lock_key]
  end
end
