module Types
  class PosterType < Types::BaseObject
    field :id, String, null: false
    field :url, String, null: true
    field :width, Integer, null: false
    field :height, Integer, null: false
    field :blurhash, String, null: true
    field :colors, PosterColorsType, null: true

    def url
      object.url(host: ENV.fetch('APP_HOST'))
    end
  end
end
