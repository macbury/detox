class Session < ApplicationRecord
  belongs_to :user
  validates :name, :ip, :public_key, presence: true

  scope :old, -> { where('updated_at < ?', 1.month.ago) }
  scope :active, -> { where('updated_at >= ?', 1.hour.ago) }

  def public_key
    @public_key ||= OpenSSL::PKey.read(self[:public_key]) if self[:public_key]
  rescue OpenSSL::PKey::PKeyError
    nil
  end
end
