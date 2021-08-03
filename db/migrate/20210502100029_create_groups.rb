class CreateGroups < ActiveRecord::Migration[6.1]
  def change
    create_table :groups, id: :uuid do |t|
      t.string :name
      t.belongs_to :user, null: false, foreign_key: true, type: :uuid
      t.string :icon

      t.timestamps
    end
  end
end
