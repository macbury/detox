class AddSecretToSettings < ActiveRecord::Migration[6.1]
  def change
    add_column :settings, :secret, :boolean, default: false
    add_column :settings, :value_type, :string
  end
end
