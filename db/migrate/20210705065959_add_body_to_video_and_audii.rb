class AddBodyToVideoAndAudii < ActiveRecord::Migration[6.1]
  def change
    add_column :videos, :body, :text, defualt: ''
    add_column :audios, :body, :text, defualt: ''
  end
end
