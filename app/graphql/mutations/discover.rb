module Mutations
  class Discover < BaseMutation
    use Channels::Discovery, as: :discovery_channel_from
    null true
    description 'Find what channels are available for url'

    argument :url, String, required: true

    field :channels, [Types::DiscoveredChannelType], null: true
    field :errors, [String], null: true

    def resolve(url:)
      authorize! Channel, to: :discover?
      channels = discovery_channel_from(url: url)

      {
        channels: channels
      }
    end
  end
end
