class AddPosterDataToChannels < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :poster
    add_column :articles, :poster_data, :jsonb
  end
end
