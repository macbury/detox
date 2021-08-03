class AddPosterDataToVideos < ActiveRecord::Migration[6.1]
  def change
    add_column :videos, :poster_data, :jsonb
    remove_column :videos, :poster
  end
end
