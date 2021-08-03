class Story < ApplicationRecord
  include Hashid::Rails
  hashid_config salt: ENV.fetch('SECRET_KEY_BASE'), override_find: true, override_to_param: true

  belongs_to :channel
  belongs_to :attachment, polymorphic: true, dependent: :destroy, optional: false
  has_one :playback, dependent: :destroy

  has_many :groups, through: :channel

  validates :guid, presence: true, uniqueness: { scope: :channel_id }
  validates :title, :permalink, presence: true
  validates :summary, presence: true, allow_blank: true

  scope :not_archived, -> { joins(:channel).where.not('channels.status' => Channel.statuses[:archived]) }
  scope :unread, -> { where(is_read: false) }
  scope :unread_from_now, -> { unread.where('view_at <= ?', Time.zone.now) }
  scope :read, -> { where(is_read: true) }
  scope :favorite, -> { where(is_favorite: true) }
  scope :newest, -> { order(view_at: :desc) }
  scope :owned_by, ->(user) { joins(:channel).where(channels: { user: user }) }
  scope :for_current_day_of_week, -> { where('EXTRACT (dow FROM published_at) = EXTRACT (DOW FROM now())') }
  scope :playable, -> { where(attachment_type: ['Audio', 'Video']) }
  scope :readable, -> { where(attachment_type: 'Article') }
  scope :viewable, -> { where(attachment_type: 'Picture') }

  before_save :adjust_read_at

  validates_associated :attachment

  def adjust_read_at
    if is_read
      self.read_at ||= Time.zone.now
    else
      self.read_at = nil
    end
  end

  def read!
    update!(is_read: true)
  end
end
