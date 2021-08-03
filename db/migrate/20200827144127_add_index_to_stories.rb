class AddIndexToStories < ActiveRecord::Migration[6.0]
  def change
    add_index :stories, [:channel_id, :guid]
  end
end
