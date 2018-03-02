# == Schema Information
#
# Table name: tracking_numbers
#
#  id              :integer          not null, primary key
#  line_item_id    :integer
#  carrier         :string
#  tracking_number :string
#  shipping_cost   :decimal(, )
#  ship_date       :datetime
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

require 'test_helper'

class TrackingNumberTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
