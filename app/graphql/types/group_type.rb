module Types
  class GroupType < BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :icon, String, null: false
    field :unread, Integer, null: false
    field :channels, [ChannelType], null: true

    def channels
      object.channels.not_archived
    end

    def unread
      object.stories.not_archived.unread_from_now.count
    end
  end
end