module Types
  class WordRulesArgument < GraphQL::Schema::Scalar
    description 'Comma separated words or sentences'

    def self.coerce_input(value, _context)
      value.split(',').flat_map(&:strip)
    end
  end
end
