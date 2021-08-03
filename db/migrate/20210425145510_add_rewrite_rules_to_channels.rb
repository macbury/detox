class AddRewriteRulesToChannels < ActiveRecord::Migration[6.1]
  def change
    add_column :channels, :rewrite_rules, :jsonb, default: []
  end
end
