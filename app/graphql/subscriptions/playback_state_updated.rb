module Subscriptions
  class PlaybackStateUpdated < BaseSubscription
    description 'Listen only for events with playback control'
    subscription_scope :current_user_id

    field :story, Types::StoryType, null: false
  end
end