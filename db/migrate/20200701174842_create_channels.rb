class CreateChannels < ActiveRecord::Migration[6.0]
  def change
    create_table :channels, id: :uuid do |t|
      t.string :name
      t.string :source
      t.string :site_url
      t.text :description
      t.datetime :last_check_at, default: 10.years.ago

      t.string :error
      t.string :status, default: 'pending'
      t.string :kind, default: 'rss'

      t.string :user_agent, default: Channel::DEFAULT_HEADER

      t.timestamps
    end
  end
end
