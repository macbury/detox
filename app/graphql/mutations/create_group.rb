module Mutations
  class CreateGroup < BaseMutation
    null true
    description 'Create new group with channels'

    argument :name, String, required: true
    argument :icon, String, required: true
    argument :channel_ids, [ID], required: true

    field :group, Types::GroupType, null: true
    field :errors, [String], null: true

  def resolve(channel_ids:, **kwargs)
      group = current_user.groups.new(kwargs)
      authorize! group, to: :create?
      group.channels = current_user.channels.find(channel_ids)
      group.save!

      {
        group: group
      }
    end
  end
end
