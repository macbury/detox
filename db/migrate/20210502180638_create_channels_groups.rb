class CreateChannelsGroups < ActiveRecord::Migration[6.1]
  def change
    create_table :channels_groups, id: false do |t|
      t.belongs_to :group, null: false, foreign_key: true, type: :uuid
      t.belongs_to :channel, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
