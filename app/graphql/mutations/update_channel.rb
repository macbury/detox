module Mutations
  class UpdateChannel < BaseMutation
    null true
    description 'Update channel settings'

    argument :id, ID, required: true
    argument :name, String, required: false
    argument :source, String, required: false
    argument :site_url, String, required: false
    argument :user_agent, String, required: false
    argument :download_page, Boolean, required: false
    argument :status, Types::ChannelStatusType, required: false
    argument :archive_size, Integer, required: false

    argument :reject_rules, String, required: false
    argument :extraction_rules, String, required: false
    argument :block_rules, Types::WordRulesArgument, required: false
    argument :rewrite_rules, [Types::RewriteRuleEnum], required: false

    field :channel, Types::ChannelType, null: true
    field :errors, [String], null: true

    def resolve(id:, **args)
      channel = Channel.find(id)
      authorize! channel, to: :update?

      RefreshChannelJob.perform_later(channel.id) if channel.update!(args)

      {
        channel: channel
      }
    end
  end
end
