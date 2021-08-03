class CreateSettings < ActiveRecord::Migration[6.1]
  def change
    create_table :settings, id: :uuid do |t|
      t.string :key
      t.string :value

      t.timestamps
    end
  end
end
