module Mutations
  class UpdateGroup < BaseMutation
    null true
    description 'Update existing group'

    argument :id, ID, required: true
    argument :name, String, required: true
    argument :icon, String, required: true
    argument :channel_ids, [ID], required: true

    field :group, Types::GroupType, null: true
    field :errors, [String], null: true

  def resolve(id:, channel_ids:, **kwargs)
      group = current_user.groups.find(id)
      authorize! group, to: :update?

      Group.transaction do
        group.channels = current_user.channels.find(channel_ids)
        group.assign_attributes(kwargs)
        group.save!
      end

      {
        group: group
      }
    end
  end
end
