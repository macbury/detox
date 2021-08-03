class Channel < ApplicationRecord
  include IconUploader::Attachment(:icon)

  DEFAULT_HEADER = 'Mozilla/5.0 (Windows NT x.y; Win64; x64; rv:10.0) Gecko/20100101 Firefox/10.0'.freeze

  REWRITE_RULES = [
    REWRITE_RULE_REPLACE_POSTER = 'replace_poster'.freeze,
    REWRITE_RULE_INSERT_POSTER = 'insert_poster'.freeze
  ].freeze

  enum status: {
    pending: 'pending',
    refreshing: 'refreshing',
    refreshed: 'refreshed',
    error: 'error',
    archived: 'archived'
  }

  enum kind: {
    rss: 'rss',
    twitter: 'twitter',
    youtube: 'youtube'
  }

  validates :source, uniqueness: { scope: [:kind, :user_id], case_sensitive: false }
  validates :name, :source, :kind, :site_url, presence: true
  validates :archive_size, presence: true, numericality: { greater_than: 0 }

  validates :extraction_rules, :reject_rules, nokogiri_query: true

  has_many :stories, dependent: :destroy
  has_one :pubsub_subscription, dependent: :destroy
  has_and_belongs_to_many :groups
  belongs_to :user

  scope :for_opml, -> { where(kind: [:rss, :youtube]) }

  def manual_extraction?
    extraction_rules.present? || reject_rules.present?
  end

  def extract_rules
    {
      scrape: extraction_rules,
      reject: reject_rules&.split(',')
    }
  end

  def cleanup_stories!
    stories.read.where(is_favorite: false).newest.offset(archive_size).destroy_all
  end

  def rewrite_rule?(rule)
    rewrite_rules.include?(rule)
  end
end
