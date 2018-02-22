class Upload < ApplicationRecord
  belongs_to :upload_batch, optional: true
  belongs_to :product, optional: true
  belongs_to :part, optional: true
  belongs_to :user, optional: true
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

  private

    def resize_images
      return false unless image?
    end

end