class Group < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :channels
  has_many :stories, through: :channels

  validates :name, presence: true, uniqueness: { scope: :user_id, case_sensitive: false }
  validates :icon, presence: true
end
