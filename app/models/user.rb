class User < ApplicationRecord
  devise :database_authenticatable, :rememberable, :trackable, :lockable,
         authentication_keys: { username: true, email: false }

  validates :username, presence: true, uniqueness: { case_sensitive: false }
  validates :password, presence: true, on: :create

  has_many :groups, dependent: :destroy
  has_many :sessions, dependent: :destroy
  has_many :channels, dependent: :destroy
  has_many :stories, through: :channels
  has_many :articles, through: :stories, source: :attachment, source_type: 'Article'
  has_many :videos, through: :stories, source: :attachment, source_type: 'Video'
  has_many :playbacks, through: :stories

  after_save :cleanup_old_sessions

  enum status: {
    normal: 'normal',
    admin: 'admin',
    inactive: 'inactive'
  }

  def cleanup_old_sessions
    sessions.old.destroy_all
  end
end
