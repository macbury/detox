class AddPublishedToStories < ActiveRecord::Migration[6.0]
  def change
    add_column :stories, :published_at, :datetime
    add_column :stories, :view_at, :datetime
  end
end
