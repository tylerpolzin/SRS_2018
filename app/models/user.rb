# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string
#  last_sign_in_ip        :string
#  user_color             :string
#  admin                  :boolean          default(FALSE)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#

class User < ApplicationRecord
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :token_authenticatable

  has_one :profile
  has_many :initiated_tasks, class_name: "Task", foreign_key: "initiated_by_id"
  has_many :assigned_tasks, class_name: "Task", foreign_key: "initiated_for_id"
  belongs_to :assignment, required: false
  belongs_to :upload, foreign_key: :uploaded_by, required: false
  
  after_create :build_profile
  # after_create :assign_default_role

  accepts_nested_attributes_for :profile, update_only: true
  accepts_nested_attributes_for :roles

  # def assign_default_role
  #   self.add_role(:newuser) if self.roles.blank?
  # end
  
  def header_name # Places the currently logged in users name in the application header (used in conjunction with 'set_current_user' in application_controller.rb)
    if self.profile.present?
      if self.profile.name.present?
        self.profile.name
      else
        if self.profile.company.present?
          self.profile.company
        else
          self.email
        end
      end
    else
      "No Profile Defined"
    end
  end
  
end
