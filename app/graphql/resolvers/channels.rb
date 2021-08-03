module Resolvers
  class Channels < Base
    include SearchObject.module(:graphql)

    description 'Lists user subscribed channels'

    scope { Channel.not_archived.order('name ASC') }

    type Types::ChannelType.connection_type, null: false
  end
end