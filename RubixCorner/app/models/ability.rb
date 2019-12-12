class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # This is if no one has logged in
    if user.has_role? :admin
        can :manage, :all
    else
      can :read, :all
    end
  end
end
