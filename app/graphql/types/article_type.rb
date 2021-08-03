module Types
  class ArticleType < Types::BaseObject
    field :id, ID, null: false
    field :body, String, null: false
    field :poster, PosterType, null: true do
      argument :variant, Types::VariantType, required: false
    end
    field :comments_url, String, null: true
    field :story, StoryType, null: false

    def poster(variant: nil)
      object.poster(variant)
    end
  end
end
