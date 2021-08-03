module Types
  class SettingType < BaseObject
    field :id, ID, null: false
    field :key, String, null: false
    field :value, String, null: true
    field :secret, Boolean, null: false
    field :value_type, SettingEnum, null: false

    def id
      object.key
    end

    def value
      if object.value.blank?
        nil
      else
        object.secret ? '**********' : object.value
      end
    end
  end
end
