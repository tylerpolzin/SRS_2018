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

require 'test_helper'

class CustomerTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
