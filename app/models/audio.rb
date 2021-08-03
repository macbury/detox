class Audio < ApplicationRecord
  include PosterUploader::Attachment(:poster)
  has_one :story, as: :attachment, dependent: :destroy
  has_one :playback, through: :story

  validates :uri, presence: true
  validates :body, presence: true, allow_blank: true
end
