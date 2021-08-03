module Types
  class ChannelType < Types::BaseObject
    field :id, ID, null: false
    field :download_page, Boolean, null: true
    field :name, String, null: true
    field :source, String, null: true
    field :site_url, String, null: true
    field :description, String, null: true
    field :last_check_at, GraphQL::Types::ISO8601DateTime, null: true
    field :error, String, null: true
    field :status, ChannelStatusType, null: true
    field :kind, ChannelKindType, null: true
    field :user_agent, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :extraction_rules, String, null: true
    field :reject_rules, String, null: true
    field :block_rules, String, null: true
    field :rewrite_rules, [Types::RewriteRuleEnum], null: true
    field :icon_url, String, null: true, description: 'Favicon icon url'
    field :domain, String, null: false, description: 'Pretty printed domain for source without protocol'

    def icon_url
      object.icon_url(:sidebar, host: ENV.fetch('APP_HOST'))
    end

    def domain
      URI.parse(object.site_url).host
    end

    def block_rules
      object.block_rules.join(',')
    end
  end
end
