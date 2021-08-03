class StoryPolicy < ApplicationPolicy
  def control_playback?
    subscribed?
  end

  def observe?
    signed_in?
  end

  def list?
    signed_in?
  end

  def show?
    subscribed?
  end

  def download?
    subscribed?
  end

  def mark_as?
    signed_in?
  end

  def update?
    subscribed?
  end

  def snooze?
    subscribed?
  end

  relation_scope do |relation|
    relation.owned_by(user)
  end

  private

  def subscribed?
    signed_in? && allowed_to?(:show?, record.channel)
  end
end
