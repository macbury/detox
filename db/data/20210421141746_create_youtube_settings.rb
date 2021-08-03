class CreateYoutubeSettings < ActiveRecord::Migration[6.1]
  def up
    Setting.youtube_cookies.create!(secret: true, value_type: :string)
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
