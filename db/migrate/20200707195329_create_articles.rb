class CreateArticles < ActiveRecord::Migration[6.0]
  def change
    create_table :articles, id: :uuid do |t|
      t.text :body
      t.boolean :is_downloaded
      t.json :poster

      t.timestamps
    end
  end
end
