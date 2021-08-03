class GroupPolicy < ApplicationPolicy
  def create?
    signed_in?
  end

  def update?
    owned?
  end

  def show?
    signed_in?
  end

  relation_scope do |relation|
    signed_in? ? relation.where(user: user) : relation.none
  end

  private

  def owned?
    return unless signed_in?
    return record.user_id == user.id if record.respond_to?(:user_id)

    true
  end
end
