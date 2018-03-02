# == Schema Information
#
# Table name: warranty_orders
#
#  id                    :integer          not null, primary key
#  task_id               :integer
#  customer_name         :string
#  order_number          :string
#  ecomm_order_reference :integer
#  details               :hstore
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#

require 'test_helper'

class WarrantyOrderTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
