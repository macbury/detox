module Triggers
  class UpdatedStories < Service
    def initialize(user:, stories:)
      @user = user
      @stories = stories
    end

    def call
      DetoxSchema.subscriptions.trigger(:observe_stories, {}, { updated: stories, new: [] }, scope: user.id)
    end

    private

    attr_reader :user, :stories
  end
end