class ComboItem < ApplicationRecord
  has_many :combo_products
  has_many :products, through: :combo_products

  validates :model_number, presence: true

  extend FriendlyId
  friendly_id :model_number, use: :slugged

  has_attached_file :image,
                    :styles => {:medium => "300x300>", :thumb => "100x100>" },
                    :default_url => "No_Image_Found"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\z/

  def product_brand_name
    name = []
    if self.products.exists?
      self.products.last(1).each do |product|
        name = product.brand_name
      end
    else
      name = "N/A"
    end
    name
  end

  def product_vendor_name
    name = []
    if self.products.exists?
      self.products.last(1).each do |product|
        name = product.vendor_name
      end
    else
      name = "N/A"
    end
    name
  end



end
