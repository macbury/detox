module Mutations
  class RefreshAll < SimpleMutation
    null true
    description 'Refresh all feeds in the background'

    field :success, Boolean, null: false
    field :errors, [String], null: false

    def resolve
      authorize! Channel, to: :refresh_all?

      authorized_scope(Channel.not_archived).pluck(:id).each do |channel_id|
        RefreshChannelJob.perform_later(channel_id)
      end

      {
        success: true,
        errors: []
      }
    end
  end
end
