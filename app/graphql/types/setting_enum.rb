module Types
  class SettingEnum < Types::BaseEnum
    ::Setting.value_types.each do |key, value|
      value key.upcase, value: value
    end
  end
end
