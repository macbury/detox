module Types
  class PosterColorsType < Types::BaseObject
    field :id, String, null: false
    field :background, String, null: false
    field :foreground, String, null: false
    field :accent, String, null: false
  end
end
