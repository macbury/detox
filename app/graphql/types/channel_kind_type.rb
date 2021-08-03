module Types
  class ChannelKindType < Types::BaseEnum
    ::Channel.kinds.each do |key, value|
      value key.upcase, value: value
    end
  end
end
