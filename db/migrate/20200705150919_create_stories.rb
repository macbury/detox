class CreateStories < ActiveRecord::Migration[6.0]
  def change
    create_table :stories do |t|
      t.belongs_to :channel, type: :uuid, index: true
      t.belongs_to :attachment, type: :uuid, polymorphic: true, index: true

      t.string :title
      t.string :permalink
      t.string :summary
      t.string :guid
      t.boolean :is_read, default: false
      t.boolean :is_junk, default: false

      t.timestamps
    end
  end
end
