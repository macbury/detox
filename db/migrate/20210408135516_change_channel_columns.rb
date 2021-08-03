class ChangeChannelColumns < ActiveRecord::Migration[6.1]
  def change
    remove_column :channels, :extraction_rules
    remove_column :channels, :transform_rules

    add_column :channels, :extraction_rules, :string, default: ''
    add_column :channels, :reject_rules, :string, default: ''
  end
end
