# == Schema Information
#
# Table name: products_parts
#
#  id         :integer          not null, primary key
#  product_id :integer
#  part_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class ProductsPartTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
