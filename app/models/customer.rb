# == Schema Information
#
# Table name: customers
#
#  id         :integer          not null, primary key
#  firstname  :string
#  lastname   :string
#  company    :string
#  address1   :string
#  address2   :string
#  city       :string
#  state      :string
#  zipcode    :string
#  country    :string
#  phone      :string
#  email      :string
#  details    :hstore
#  lat        :string           default("0.0")
#  long       :string           default("0.0")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Customer < ApplicationRecord
  has_and_belongs_to_many :warranty_orders, optional: true
  has_many :comments, as: :commentable, dependent: :destroy
  accepts_nested_attributes_for :comments, :allow_destroy => true, :reject_if => :comment_blank
  
  def comment_blank(a)
    self.new_record? && a[:content].blank?
  end

  def name
    if self.firstname.present?
      if self.lastname.present?
        "#{firstname} #{lastname}"
      else
        "#{firstname} (No Last Name Given)"
      end
    else
      if self.lastname.present?
        "(No First Name Given) #{lastname}"
      else
        if self.company.present?
          "#{company}"
        else
          "(No Name Given)"
        end
      end
    end
  end

end
