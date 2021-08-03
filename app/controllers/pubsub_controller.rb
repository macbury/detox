class PubsubController < ApplicationController
  def callback
    @pubsub_subscription = PubsubSubscription.find(params.require(:id))
    @pubsub_subscription.update!(expire_at: expire_at)

    RefreshChannelJob.perform_later(@pubsub_subscription.channel_id) unless params['hub.mode'] == 'subscribe'

    render nothing: true
  end

  private

  def expire_at
    params.require('hub.lease_seconds').to_i.seconds.from_now
  end
end
