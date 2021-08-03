class RecreateGroups < ActiveRecord::Migration[6.1]
  def change
    drop_table :channels_groups
    drop_table :groups

    create_table :groups, id: :uuid do |t|
      t.string :name
      t.belongs_to :user, null: false, foreign_key: true, type: :uuid
      t.string :icon

      t.timestamps
    end

    create_table :channels_groups, id: false do |t|
      t.belongs_to :group, null: false, foreign_key: true, type: :uuid
      t.belongs_to :channel, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
