class CreateVideos < ActiveRecord::Migration[6.0]
  def change
    create_table :videos, id: :uuid do |t|
      t.integer :duration
      t.string :uri
      t.json :poster

      t.timestamps
    end
  end
end
