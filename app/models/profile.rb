# == Schema Information
#
# Table name: profiles
#
#  id          :integer          not null, primary key
#  user_id     :integer
#  name        :string
#  company     :string
#  position    :string
#  address     :string
#  city        :string
#  state       :string
#  zipcode     :string
#  phone1      :string
#  phone1_type :string
#  phone2      :string
#  phone2_type :string
#  email       :string
#  notes       :text
#  lat         :float
#  long        :float
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  details     :hstore
#

class Profile < ApplicationRecord
  belongs_to :user
  has_many :comments, as: :commentable
end
