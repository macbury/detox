class Article < ApplicationRecord
  include PosterUploader::Attachment(:poster)

  has_one :story, as: :attachment, dependent: :destroy

  validates :body, presence: true, allow_blank: true
end
