class AddDownloadPageToChannels < ActiveRecord::Migration[6.0]
  def change
    add_column :channels, :download_page, :boolean, default: false
  end
end
