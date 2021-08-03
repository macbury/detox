class FixVideosSizes < ActiveRecord::Migration[6.1]
  def up
    Video.where(width: nil).each do |video|
      video.story.destroy
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
