module Types
  class UserStatusType < Types::BaseEnum
    User.statuses.each do |key, value|
      value key.upcase, value: value
    end
  end
end
