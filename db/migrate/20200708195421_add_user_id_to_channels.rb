class AddUserIdToChannels < ActiveRecord::Migration[6.0]
  def change
    add_column :channels, :user_id, :uuid
  end
end
