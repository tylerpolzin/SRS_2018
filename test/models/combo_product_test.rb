# == Schema Information
#
# Table name: combo_products
#
#  id            :integer          not null, primary key
#  combo_item_id :integer
#  product_id    :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'test_helper'

class ComboProductTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
