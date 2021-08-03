module TokenScopes
  # Used for sign in Proof of work
  NONCE = 'nonce'.freeze

  def self.nonce_token(difficulty)
    Tokens::Encode.call(
      payload: {
        aud: [NONCE],
        nonce: SecureRandom.hex(32),
        difficulty: difficulty,
        exp: 1.minute.from_now.to_i
      }
    )
  end

  def self.generate_token(refresh_token:, scopes:, expire_at: nil, payload: {})
    payload = payload.merge(
      aud: scopes,
      refresh_token_id: refresh_token.id
    )

    payload[:exp] = expire_at.to_i if expire_at

    Tokens::Encode.call(
      hmac_secret: refresh_token.jwt_hmac_secret_base,
      payload: payload
    )
  end
end