class AddOptionsToChannels < ActiveRecord::Migration[6.0]
  def change
    add_column :channels, :transform_rules, :string, array: true, default: []
    add_column :channels, :extraction_rules, :string, array: true, default: []
  end
end
