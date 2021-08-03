module Mutations
  class Subscribe < BaseMutation
    use Channels::Create, as: :create_subscription
    null true
    description 'Subscribe to channel using provided url'

    argument :source, String, required: true
    argument :kind, Types::ChannelKindType, required: true

    field :channel, Types::ChannelType, null: true
    field :errors, [String], null: true

    def resolve(source:, kind:)
      authorize! Channel, to: :subscribe?

      {
        channel: create_subscription(
          source: source,
          kind: kind,
          user: current_user
        )
      }
    end
  end
end
