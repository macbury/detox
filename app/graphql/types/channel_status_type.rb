module Types
  class ChannelStatusType < Types::BaseEnum
    Channel.statuses.each do |key, value|
      value key.upcase, value: value
    end
  end
end
