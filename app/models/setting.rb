class Setting < ApplicationRecord
  enum key: {
    youtube_cookies: 'youtube_cookies',
    words_blacklist: 'words_blacklist'
  }

  enum value_type: {
    string: 'string',
    number: 'number'
  }

  validates :key, presence: true, uniqueness: true

  def self.get(key)
    Setting.find_or_initialize_by(key: key).value
  end

  def self.set(key, value)
    Setting.find_by!(key: key).tap do |setting|
      setting.value = value
      setting.save!
    end
  end
end
