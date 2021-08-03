class CreateRefreshTokens < ActiveRecord::Migration[6.0]
  def change
    create_table :refresh_tokens, id: :uuid do |t|
      t.belongs_to :user, type: :uuid
      t.string :ip
      t.string :jwt_hmac_secret_base
      t.string :name
      t.timestamps
    end
  end
end
