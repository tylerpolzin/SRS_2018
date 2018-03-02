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

class ItemUpload < ApplicationRecord
  belongs_to :upload
  belongs_to :itemable, polymorphic: true

end
