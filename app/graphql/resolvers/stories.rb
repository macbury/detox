module Resolvers
  class Stories < Base
    include SearchObject.module(:graphql)

    description 'Lists user stories'
    scope do
      scope = Story.not_archived.includes(:channel)
      authorized_scope(scope)
    end

    type Types::StoryType.connection_type, null: false

    option(:updated_after, type: GraphQL::Types::ISO8601DateTime, required: false) { |scope, date| date ? scope.where('stories.updated_at >= ?', date) : scope }
    option(:start_time, type: Types::TimeArgument, required: false) { |scope, date| date ? scope.where('view_at <= ?', date) : scope }
    option(:unread, type: Boolean, default: false) { |scope, unread| unread ? scope.unread : scope }
    option(:favorite, type: Boolean, default: false) { |scope, favorite| favorite ? scope.favorite : scope }
    option(:channel_id, type: ID) { |scope, channel_id| channel_id ? scope.where(channel_id: channel_id) : scope }
    option(:group_id, type: ID, required: false) { |scope, group_id| group_id ? scope.joins(:groups).where(groups: { id: group_id }) : scope }
    option(:order, type: Types::OrderType, default: 'Newest', required: false)
    option(:kind, type: Types::StoryKindType, required: false) { |scope, value| value == 'All' ? scope : scope.send(value) }
    option(:except_ids, type: [ID]) { |scope, ids| ids.empty? ? scope : scope.where.not('stories.id' => except_ids.map { |story_id| Story.decode_id(story_id) }) }

    def apply_order_with_newest(scope)
      scope.order 'view_at DESC'
    end

    def apply_order_with_unread_first(scope)
      scope.order 'is_read ASC NULLS FIRST, read_at DESC NULLS LAST, view_at DESC'
    end

    def apply_order_with_oldest(scope)
      scope.order 'view_at ASC'
    end

    def apply_order_with_recently_read(scope)
      scope.order 'read_at DESC NULLS LAST, view_at DESC'
    end

    def results
      Connections::StoriesConnection.new(super)
    end
  end
end