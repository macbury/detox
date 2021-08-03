class AddReadAtToStories < ActiveRecord::Migration[6.1]
  def change
    add_column :stories, :read_at, :datetime
  end
end
