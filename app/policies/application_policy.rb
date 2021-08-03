# Base class for application policies
class ApplicationPolicy < ActionPolicy::Base
  # Configure additional authorization contexts here
  # (`user` is added by default).
  #
  #   authorize :account, optional: true
  #
  # Read more about authorization context: https://actionpolicy.evilmartians.io/#/authorization_context

  private

   def owner?
     record.user_id == user.id
   end

  def signed_in?
    user.present? && user.persisted? && !user.inactive?
  end

  def admin?
    user&.admin?
  end
end
