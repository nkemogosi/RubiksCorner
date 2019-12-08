class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
#  before_action :authenticate_user!
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,authentication_keys: [:login]
  attr_accessor :login
  attr_writer :login
  has_many :r_times, :dependent => :destroy
  validates :username, presence: :true, uniqueness: { case_sensitive: false }
    validates_format_of :username, with: /^[a-zA-Z0-9_\.]*$/, :multiline => true
  validate :validate_username
  def login
    @login || self.username || self.email
  end
  def self.find_for_database_authentication warden_conditions
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions).where(["lower(username) = :value OR lower(email) = :value", {value: login.strip.downcase}]).first
    elsif conditions.has_key?(:username) || conditions.has_key?(:email)
      where(conditions.to_h).first
    end
    conditions[:email].downcase! if conditions[:email]
    where(conditions.to_h).first
  end
  def validate_username
  if User.where(email: username).exists?
    errors.add(:username, :invalid)
  end
end

end
