class CreatePlaybacks < ActiveRecord::Migration[6.1]
  def change
    create_table :playbacks, id: :uuid do |t|
      t.belongs_to :story, null: false, foreign_key: true
      t.string :status
      t.integer :position, default: 0
      t.integer :duration, default: 1
      t.datetime :resumed_at

      t.timestamps
    end
  end
end
