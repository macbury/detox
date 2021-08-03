module Mutations
  class ReimportStories < BaseMutation
    null true
    description 'Cleanup current stories and run again sync'

    argument :id, ID, required: true

    field :channel, Types::ChannelType, null: true
    field :errors, [String], null: true

    def resolve(id:)
      channel = Channel.find(id)
      authorize! channel, to: :reimport?

      channel.stories.destroy_all
      RefreshChannelJob.perform_later(channel.id)

      {
        channel: channel
      }
    end
  end
end
