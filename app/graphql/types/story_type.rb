module Types
  class StoryType < Types::BaseObject
    connection_type_class Types::StoriesConnectionType

    field :id, ID, null: false
    field :attachment, StoryAttachmentType, null: true
    field :channel, ChannelType, null: true
    field :groups, [GroupType], null: true
    field :title, String, null: true
    field :permalink, String, null: true
    field :summary, String, null: true
    field :guid, String, null: true
    field :is_read, Boolean, null: false
    field :is_favorite, Boolean, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :published_at, GraphQL::Types::ISO8601DateTime, null: true
    field :view_at, GraphQL::Types::ISO8601DateTime, null: true
    field :domain, String, null: true, description: 'Pretty printed domain for source without protocol'

    def domain
      @domain ||= URI.parse(object.permalink).host
    rescue URI::InvalidURIError
      nil
    end

    def id
      object.to_param
    end
  end
end
