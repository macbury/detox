class ChangeRefreshTokens < ActiveRecord::Migration[6.1]
  def change
    drop_table :refresh_tokens

    create_table :sessions, id: :uuid do |t|
      t.belongs_to :user, type: :uuid
      t.string :ip
      t.string :public_key
      t.string :name
      t.timestamps
    end
  end
end
