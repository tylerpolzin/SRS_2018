class Upload < ApplicationRecord
  belongs_to :upload_batch, optional: true
  belongs_to :product, optional: true
  belongs_to :part, optional: true
  has_attached_file :file
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

end