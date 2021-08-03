module Channels
  # Download and attach poster to attachment model
  class AttachPoster < Service
    def initialize(attachment, url)
      @attachment = attachment
      @url = url
    end

    def call
      attachment.poster = PosterUploader.remote_url(url)

      attacher = PosterUploader::Attacher.from_model(attachment, :poster)
      attacher.validate

      if attacher.errors.empty?
        attachment.poster_derivatives!
      else
        error "Could not build attachment #{attacher.errors}"
        attachment.poster = nil
      end
    rescue Shrine::Plugins::RemoteUrl::DownloadError, Magick::ImageMagickError => e
      error "Could not build attachment #{e}"
      attachment.poster = nil
    end

    private

    attr_reader :attachment, :url
  end
end
