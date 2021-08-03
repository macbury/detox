module Mutations
  class RefreshChannelIcon < BaseMutation
    use Channels::UpdateIcon, as: :update_icon
    null true
    description 'Finds what icon channel has and downloads it'

    argument :id, ID, required: true

    field :channel, Types::ChannelType, null: true
    field :errors, [String], null: true

    def resolve(id:)
      channel = current_user.channels.find(id)
      update_icon(icon)

      {
        channel: channel
      }
    end
  end
end
