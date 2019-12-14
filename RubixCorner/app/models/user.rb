class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
#  before_action :authenticate_user!
  rolify
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,authentication_keys: [:login]
  attr_accessor :login
  attr_writer :login
  has_many :r_times, :dependent => :destroy  # remove all times related to this user
  has_many :discussions, :dependent => :destroy  # remove all discussions related to this user
  has_many :channels, :through => :discussions # the user can access the channels through discussions
  validates :username, presence: :true, uniqueness: { case_sensitive: false } #checks if username is both unique and present in all cases
  validates_format_of :username, with: /^[a-zA-Z0-9_\.]*$/, :multiline => true #validates that the username is alphanumeric with limited punctiation
  validate :validate_username
  def login
    @login || self.username || self.email
  end
  #Allows the user to sign in with both username and email
  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions.to_h).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
    elsif conditions.has_key?(:username) || conditions.has_key?(:email)
      where(conditions.to_h).first
    end
  end
  #Secondary validation check on username
  def validate_username
    if User.where(email: username).exists?
        errors.add(:username, :invalid)
    end
  end
end
