module Triggers
  class NewStories < Service
    def initialize(user:, stories:)
      @user = user
      @stories = stories
    end

    def call
      DetoxSchema.subscriptions.trigger(:observe_stories, {}, { updated: [], new: stories }, scope: user.id)
    end

    private

    attr_reader :user, :stories
  end
end