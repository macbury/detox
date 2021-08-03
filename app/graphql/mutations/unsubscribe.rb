module Mutations
  class Unsubscribe < BaseMutation
    null true
    description 'Unsubscribe from channel'

    argument :id, ID, required: true

    field :channel, Types::ChannelType, null: true
    field :errors, [String], null: true

    def resolve(id:)
      channel = Channel.find(id)
      authorize! channel, to: :unsubscribe?
      channel.archived!

      {
        channel: channel
      }
    end
  end
end
