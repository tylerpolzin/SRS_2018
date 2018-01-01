class User < ApplicationRecord
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_one :profile
  
  after_create :build_profile
  
  accepts_nested_attributes_for :profile, update_only: true
  accepts_nested_attributes_for :roles

  def assign_default_role
    self.add_role(:newuser) if self.roles.blank?
  end
  
  def header_name # Places the currently logged in users name in the application header (used in conjunction with 'set_current_user' in application_controller.rb)
    if self.profile.name.present?
      self.profile.name
    else
      if self.profile.company.present?
        self.profile.company
      else
        self.email
      end
    end
  end
  
end
