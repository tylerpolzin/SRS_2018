class User < ApplicationRecord
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
  has_one :profile
  
  after_create :build_profile
  
  accepts_nested_attributes_for :profile, update_only: true

  def assign_default_role
    self.add_role(:newuser) if self.roles.blank?
  end
  
end
