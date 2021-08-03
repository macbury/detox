class CreateAudios < ActiveRecord::Migration[6.1]
  def change
    create_table :audios, id: :uuid do |t|
      t.integer :duration
      t.string :uri
      t.json :poster_data

      t.timestamps
    end
  end
end
