class CreatePictures < ActiveRecord::Migration[6.1]
  def change
    create_table :pictures, id: :uuid do |t|
      t.jsonb :file

      t.timestamps
    end
  end
end
