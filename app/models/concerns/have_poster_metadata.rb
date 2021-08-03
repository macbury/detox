module HavePosterMetadata
  extend ActiveSupport::Concern

  included do
    before_save :update_poster_metadata
  end

  def poster_metadata
    @poster_metadata ||= PosterMetaData.new(poster)
  end

  def poster_metadata=(new_data)
    @poster_metadata = new_data
  end

  def update_poster_metadata
    self.poster = poster_metadata.to_hash
  end
end
