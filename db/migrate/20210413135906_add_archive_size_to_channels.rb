class AddArchiveSizeToChannels < ActiveRecord::Migration[6.1]
  def change
    add_column :channels, :archive_size, :integer, default: 35
  end
end
