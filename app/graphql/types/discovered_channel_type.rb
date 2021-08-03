module Types
  class DiscoveredChannelType < Types::BaseObject
    use Security::GenerateProxyUrl, as: :favicon_proxied_url

    field :kind, ChannelKindType, null: false
    field :title, String, null: false
    field :url, String, null: false
    field :source, String, null: false
    field :icon_url, String, null: true

    def icon_url
      favicon_proxied_url(object.icon_url) if object.icon_url
    end
  end
end
