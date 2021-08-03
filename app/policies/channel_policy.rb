class ChannelPolicy < ApplicationPolicy
  def index?
    signed_in?
  end

  def show?
    owned?
  end

  def update?
    owned?
  end

  def reimport?
    owned?
  end

  def refresh_all?
    signed_in?
  end

  def refresh?
    owned?
  end

  def discover?
    signed_in?
  end

  def subscribe?
    owned?
  end

  def unsubscribe?
    owned?
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
