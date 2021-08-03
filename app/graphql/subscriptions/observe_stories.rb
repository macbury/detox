module Subscriptions
  class ObserveStories < BaseSubscription
    description 'Observer stories'
    subscription_scope :current_user_id

    field :unread_stories, Types::UnreadStoriesType, null: true
    field :new, [Types::StoryType], null: true
    field :updated, [Types::StoryType], null: true

    def subscribe
      {
        unread_stories: {},
        new: [],
        updated: []
      }
    end

    def update
      {
        unread_stories: {},
        new: object[:new],
        updated: object[:updated]
      }
    end
  end
end