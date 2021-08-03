module Resolvers
  class Settings < Base
    include SearchObject.module(:graphql)

    description 'List all settings'

    scope do
      Setting.order(:key)
    end

    type [Types::SettingType], null: false
  end
end