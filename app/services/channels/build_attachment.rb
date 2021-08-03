module Channels
  # Depending on EntryMetadata use appropiate attachment type
  class BuildAttachment < Service
    include ActionView::Helpers::TextHelper
    attr_reader :channel, :entry_metadata

    use Extract::Youtube::VideoDetails, as: :get_video_details
    use BuildAudioAttachment, as: :build_audio_from_url
    use AttachPoster, as: :attach_poster

    def initialize(channel:, entry_metadata:)
      @channel = channel
      @entry_metadata = entry_metadata
    end

    def call
      if podcast?
        build_audio
      elsif youtube_id
        build_youtube_video
      elsif looks_like_picture?
        build_picture
      else
        build_article
      end
    end

    private

    def podcast?
      entry_metadata.media_url.present?
    end

    def build_audio
      build_audio_from_url(entry_metadata.media_url).tap do |audio|
        audio.body = entry_metadata.body
        
        attach_poster(audio, entry_metadata.poster_url) if entry_metadata.poster_url
      end
    end

    def looks_like_picture?
      false #entry_metadata.body.size <= 100 && entry_metadata.poster_url.present?
    end

    def build_article
      Article.new(
        body: entry_metadata.body,
        comments_url: entry_metadata.comments_url
      ).tap do |article|
        attach_poster(article, entry_metadata.poster_url) if entry_metadata.poster_url
      end
    end

    def build_youtube_video
      video_data = get_video_details(youtube_id)

      Video.new(
        body: simple_format(video_data.description),
        uri: video_data.uri,
        duration: video_data.approx_duration,
        width: video_data.width,
        height: video_data.height
      ).tap do |video|
        attach_poster(video, video_data.poster_url) if video_data.poster_url
      end
    end

    def youtube_id
      @youtube_id ||= YoutubeID.from(entry_metadata.permalink)
    end
  end
end