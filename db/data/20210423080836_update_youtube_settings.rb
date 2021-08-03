class UpdateYoutubeSettings < ActiveRecord::Migration[6.1]
  def up
    Setting.youtube_cookies.update_all(secret: true, value_type: :string)
  end

  def down
  end
end
