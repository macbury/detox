module Types
  class UnreadStoriesType < BaseObject
    field :total, Integer, null: false
    field :groups, [GroupType], null: false

    def groups
      current_user.groups
    end

    def total
      current_user.stories.not_archived.unread_from_now.count
    end
  end
end
