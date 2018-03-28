# == Schema Information
#
# Table name: uploads
#
#  id                :integer          not null, primary key
#  description       :string
#  upload_batch_id   :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  file_file_name    :string
#  file_content_type :string
#  file_file_size    :integer
#  file_updated_at   :datetime
#  remove_file       :boolean          default(FALSE)
#  uploaded_by       :integer
#

class Upload < ApplicationRecord
  belongs_to :upload_batch, optional: true
  belongs_to :user, foreign_key: :uploaded_by
  has_many :comments, as: :commentable
  has_many :item_uploads
  has_many :parts, through: :item_uploads, source: :itemable, source_type: 'Part'
  has_many :products, through: :item_uploads, source: :itemable, source_type: 'Product'
  has_many :tasks, through: :item_uploads, source: :itemable, source_type: 'Task'
  
  validates_presence_of :file
  
  accepts_nested_attributes_for :item_uploads, :allow_destroy => true
  accepts_nested_attributes_for :products, :allow_destroy => true
  accepts_nested_attributes_for :parts, :allow_destroy => true
  
  has_attached_file :file, :styles => {:medium => "300x300>", :thumb => "100x100>" }
  before_post_process :resize_images
  validates_attachment_content_type :file, :content_type => %w(application/pdf
                                                               application/zip
                                                               application/msword 
                                                               application/vnd.ms-office
                                                               application/vnd.ms-excel 
                                                               application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
                                                               image/jpg
                                                               image/jpeg
                                                               image/png
                                                               image/gif
                                                               image/bmp
                                                               application/force-download
                                                               application/ppt
                                                               application/pptx)

  def image?
    file_content_type =~ %r{^(image|(x-)?application)/(bmp|gif|jpeg|jpg|pjpeg|png|x-png)$}
  end

  def description_if_description
    if self.description.present?
      "#{self.description}"
    else
      "#{self.file_file_name}"
    end
  end
  
  def products_or_parts
    
  end

  private

    def resize_images
      return false unless image?
    end

end
