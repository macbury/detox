class CreateWordBlacklist < ActiveRecord::Migration[6.1]
  def up
    Setting.words_blacklist.create!(secret: false, value_type: :string)
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
