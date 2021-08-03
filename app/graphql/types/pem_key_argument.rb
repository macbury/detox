module Types
  class PemKeyArgument < GraphQL::Schema::Scalar
    description 'ES256 key in pem format'

    def self.coerce_input(value, _context)
      OpenSSL::PKey.read(value)
    rescue OpenSSL::PKey::PKeyError => e
      raise GraphQL::CoercionError, e.to_s
    end
  end
end
