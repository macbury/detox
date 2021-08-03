module Mutations
  class Refresh < BaseMutation
    null true
    description 'Refresh feed in the background'

    argument :id, ID, required: true, description: 'Channel id'

    field :channel, Types::ChannelType, null: true
    field :errors, [String], null: true

    def resolve(id:)
      channel = Channel.not_archived.find(id)
      authorize! channel, to: :refresh?

      RefreshChannelJob.perform_later(channel.id)

      {
        channel: channel
      }
    end
  end
end
