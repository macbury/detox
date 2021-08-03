module Types
  class SubscriptionType < Types::BaseObject
    field :observe_stories, subscription: Subscriptions::ObserveStories, preauthorize: { with: StoryPolicy, to: :observe? }
    field :playback_state_updated, subscription: Subscriptions::PlaybackStateUpdated, preauthorize: { with: StoryPolicy, to: :observe? }
  end
end
