module Playbacks
  class Control < Service
    MIN_END_OF_TRACK = 10.seconds
    PERCENT_OF_TRACK_TO_MARK_AS_READ = 0.9

    def initialize(story:, position: 0, is_playing: false, duration: 1)
      @story = story
      @position = position
      @duration = duration
      @is_playing = is_playing

      @mark_as_read_from_position = [duration * PERCENT_OF_TRACK_TO_MARK_AS_READ, MIN_END_OF_TRACK].max
    end

    def call
      Playback.transaction do
        was_playing = story.playback&.playing?
        current_user.playbacks.playing.update_all(status: :paused, resumed_at: nil) if is_playing

        playback.update!(
          status: is_playing ? :playing : :paused,
          position: position,
          resumed_at: is_playing ? Time.zone.now : nil,
          duration: duration
        )

        if was_playing && playback.paused? && at_end_of_track?
          info 'Playback position at the end, marking story as read'
          story.read!
        end

        playback
      end
    end

    private

    attr_reader :story, :position, :is_playing, :duration, :mark_as_read_from_position

    def current_user
      story.channel.user
    end

    def playback
      @playback ||= story.playback || story.create_playback
    end

    def at_end_of_track?
      position >= mark_as_read_from_position
    end
  end
end