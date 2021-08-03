# Cleanup cache
class CleanupJob < ApplicationJob
  def perform
    Rails.cache.cleanup
  end
end