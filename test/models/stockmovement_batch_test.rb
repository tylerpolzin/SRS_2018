# == Schema Information
#
# Table name: stockmovement_batches
#
#  id                 :integer          not null, primary key
#  user_id            :integer
#  stockmovement_type :string
#  notes              :text
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

require 'test_helper'

class StockmovementBatchTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
