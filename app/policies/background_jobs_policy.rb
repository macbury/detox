class BackgroundJobsPolicy < ApplicationPolicy
  def show?
    admin?
  end

  def destroy?
    admin?
  end
end
