class SettingPolicy < ApplicationPolicy
  def show?
    admin?
  end

  def update?
    admin?
  end

  relation_scope do |relation|
    admin? ? relation : relation.none
  end
end