require 'streamio-ffmpeg'

module Channels
  # Build audio attachment. Fetch audio metadata and extract poster
  class BuildAudioAttachment < Service
    def initialize(media_url)
      @media_url = media_url
    end

    def call
      return unless ffmpeg.valid?

      Audio.new(
        uri: media_url,
        duration: ffmpeg.duration
      )
    end

    private

    attr_reader :media_url

    def ffmpeg
      @ffmpeg ||= FFMPEG::Movie.new(media_url)
    end
  end
end