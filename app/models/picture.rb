class Picture < ApplicationRecord
  include PictureUploader::Attachment(:file)

  has_one :story, as: :attachment, dependent: :destroy
end
