# == Schema Information
#
# Table name: item_uploads
#
#  id            :integer          not null, primary key
#  upload_id     :integer
#  itemable_id   :integer
#  itemable_type :string
#  created_at    :datetime
#  updated_at    :datetime
#

require 'test_helper'

class ItemUploadTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
