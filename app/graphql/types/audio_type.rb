module Types
  class AudioType < Types::BaseObject
    use Security::GenerateProxyUrl, as: :favicon_proxied_url

    field :id, ID, null: false
    field :playback, PlaybackType, null: true
    field :poster, PosterType, null: true do
      argument :variant, Types::VariantType, required: false
    end
    field :uri, String, null: false
    field :secure_uri, String, null: false
    field :duration, Integer, null: true
    field :story, StoryType, null: false
    field :body, String, null: false

    def poster(variant: nil)
      object.poster(variant)
    end

    def secure_uri
      favicon_proxied_url(object.uri)
    end
  end
end
