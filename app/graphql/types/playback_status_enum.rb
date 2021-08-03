module Types
  class PlaybackStatusEnum < Types::BaseEnum
    graphql_name 'PlaybackStatus'

    ::Playback.statuses.each do |key, value|
      value key.upcase, value: value
    end
  end
end
