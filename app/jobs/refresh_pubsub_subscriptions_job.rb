# Refresh all not archived channels
class RefreshPubsubSubscriptionsJob < ApplicationJob
  use Channels::Youtube::SubscribePubsub, as: :subscribe

  def perform
    PubsubSubscription.expired.delete_all

    channels_to_resubscribe.find_each do |channel|
      subscribe(channel)
    end
  end

  def lock_key
    'RefreshPubsubSubscriptionsJob'
  end

  private

  def channels_to_resubscribe
    Channel.youtube.where.not(id: PubsubSubscription.pluck(:channel_id))
  end
end