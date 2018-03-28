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
#  lat         :string
#  long        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  details     :hstore
#

require 'test_helper'

class ProfileTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
