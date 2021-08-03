class CreateTrigger < ActiveRecord::Migration[6.1]
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION async_jobs_status_notify()
        RETURNS trigger AS
      $$

      BEGIN
        PERFORM pg_notify('async_jobs_status_channel', NEW.id::text);
        RETURN NEW;
      END;

      $$ LANGUAGE plpgsql;

      CREATE TRIGGER async_jobs_status
        AFTER INSERT
        ON async_job_job_blueprints
        FOR EACH ROW
      EXECUTE PROCEDURE async_jobs_status_notify();
    SQL
  end
end
