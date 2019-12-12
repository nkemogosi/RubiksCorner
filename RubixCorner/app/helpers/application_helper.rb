module ApplicationHelper
  def has_role?(role)
    current_user && current_user.has_role?(role)#Creating a helper for roles
  end
end
