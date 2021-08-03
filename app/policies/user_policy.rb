class UserPolicy < ApplicationPolicy
  def show?
    owned? || admin?
  end

  def create?
    admin?
  end

  def update?
    admin? || owned?
  end

  def change_password?
    admin? || owned?
  end

  private

  def owned?
    signed_in? && record.respond_to?(:id) && record.id == user.id
  end
end