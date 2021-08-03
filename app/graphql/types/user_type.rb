module Types
  class UserType < BaseObject
    field :id, ID, null: false
    field :username, String, null: false
    field :status, Types::UserStatusType, null: false
  end
end
