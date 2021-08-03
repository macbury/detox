module Types
  class PlaybackType < BaseObject
    field :id, ID, null: false
    field :story, StoryType, null: false
    field :position, Integer, null: false
    field :duration, Integer, null: false
    field :resumed_at, GraphQL::Types::ISO8601DateTime, null: true
    field :status, PlaybackStatusEnum, null: false
  end
end