class Video < ApplicationRecord
  include PosterUploader::Attachment(:poster)
  has_one :story, as: :attachment, dependent: :destroy
  has_one :playback, through: :story

  validates :uri, presence: true
  validates :body, presence: true, allow_blank: true

  validates :width, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 128 }
  validates :height, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 128 }
end
