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
#  customer_id           :integer
#  status                :string           default("New")
#  due_date              :datetime
#  completion_date       :datetime
#  cancellation_reason   :string
#  active                :boolean          default(TRUE)
#  requested_carrier     :string
#  requested_method      :string
#

require 'test_helper'

class WarrantyOrderTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
