# == Schema Information
#
# Table name: upload_batches
#
#  id         :integer          not null, primary key
#  notes      :text
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UploadBatch < ApplicationRecord
  has_many :uploads
  has_many :comments, as: :commentable
  
  accepts_nested_attributes_for :uploads, :allow_destroy => true
  accepts_nested_attributes_for :comments, :allow_destroy => true

end
