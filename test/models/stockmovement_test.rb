# == Schema Information
#
# Table name: stockmovements
#
#  id                     :integer          not null, primary key
#  product_id             :integer
#  part_id                :integer
#  quantity               :integer
#  adjust_quantity        :integer
#  stockmovement_batch_id :integer
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#

require 'test_helper'

class StockmovementTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
