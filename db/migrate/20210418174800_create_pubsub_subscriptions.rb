class CreatePubsubSubscriptions < ActiveRecord::Migration[6.1]
  def change
    create_table :pubsub_subscriptions, id: :uuid do |t|
      t.belongs_to :channel, type: :uuid
      t.datetime :expire_at

      t.timestamps
    end
  end
end
