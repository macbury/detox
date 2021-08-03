class AddAdminToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :status, :string, default: 'normal'
  end
end
