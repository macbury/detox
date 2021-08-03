module Mutations
  class UpdateSetting < BaseMutation
    null true
    description 'Update setting value'

    argument :key, String, required: true, description: 'Setting key'
    argument :value, String, required: false

    field :setting, Types::SettingType, null: true
    field :errors, [String], null: true

    def resolve(key:, **args)
      setting = Setting.find_by!(key: key)
      authorize! setting, to: :update?

      setting.update!(args)

      {
        setting: setting
      }
    end
  end
end
