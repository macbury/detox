class AddBlockRulesToChannels < ActiveRecord::Migration[6.1]
  def change
    add_column :channels, :block_rules, :jsonb, default: []
  end
end
