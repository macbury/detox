module Types
  class VariantType < Types::BaseEnum
    graphql_name 'Variant'

    value 'Desktop', value: :desktop
    value 'Mobile', value: :mobile
    value 'Original', value: :original
  end
end
