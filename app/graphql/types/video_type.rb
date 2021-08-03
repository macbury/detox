module Types
  class VideoType < Types::BaseObject
    use Extract::Youtube::Streams, as: :fetch_streams

    field :id, ID, null: false
    field :width, Integer, null: false
    field :height, Integer, null: false
    field :body, String, null: false
    field :playback, PlaybackType, null: true
    field :poster, PosterType, null: true do
      argument :variant, Types::VariantType, required: false
    end
    field :uri, String, null: false
    field :duration, Integer, null: true
    field :story, StoryType, null: false
    field :streams, [StreamType], null: true

    def streams
      youtube_id = YoutubeID.from(object.uri)
      fetch_streams(youtube_id)
    end

    def poster(variant: nil)
      object.poster(variant)
    end
  end
end
