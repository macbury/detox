class AddCommentsUrlToArticles < ActiveRecord::Migration[6.0]
  def change
    add_column :articles, :comments_url, :string
  end
end
