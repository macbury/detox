module Types
  class StreamType < Types::BaseObject
    use Security::GenerateProxyUrl, as: :sign_url

    field :url, String, null: false
    field :mime_type, String, null: false
    field :bitrate, Integer, null: false
    field :quality, String, null: false
    field :secure_url, String, null: false

    def secure_url
      sign_url object.url
    end
  end
end