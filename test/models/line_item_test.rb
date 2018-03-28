# == Schema Information
#
# Table name: line_items
#
#  id                :integer          not null, primary key
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  quantity          :integer          default(0)
#  product_id        :integer
#  part_id           :integer
#  combo_item_id     :integer
#  ecomm_order_id    :integer
#  warranty_order_id :integer
#  item_cost         :decimal(, )      default(0.0)
#

require 'test_helper'

class LineItemTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
