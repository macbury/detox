class PubsubSubscription < ApplicationRecord
  belongs_to :channel

  scope :expired, -> { where('expire_at <= ?', Time.zone.now) }
end
