class AddIconDataToChannels < ActiveRecord::Migration[6.1]
  def change
    add_column :channels, :icon_data, :jsonb
  end
end
