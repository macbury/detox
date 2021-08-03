module Triggers
  class PlaybackUpdated < Service
    def initialize(user:, story:)
      @user = user
      @story = story
    end

    def call
      DetoxSchema.subscriptions.trigger(:playback_state_updated, {}, { story: @story }, scope: @user.id)
    end
  end
end