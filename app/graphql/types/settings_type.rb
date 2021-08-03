module Types
  class SettingsType < BaseObject
    field :download_backup_url, String, null: false
    field :locale, String, null: false, description: 'Current used locale'
    field :timezone, String, null: false, description: 'Current user timezone'
  end
end