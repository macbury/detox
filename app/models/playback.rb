class Playback < ApplicationRecord
  belongs_to :story

  enum status: {
    playing: 'playing',
    paused: 'paused'
  }

  validates :position, numericality: { greater_than_or_equal: 0 }
  validates :duration, numericality: { greater_than: 0 }
end
