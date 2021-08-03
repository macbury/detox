class AddIsFavoriteToStories < ActiveRecord::Migration[6.1]
  def change
    add_column :stories, :is_favorite, :boolean, default: false
  end
end
