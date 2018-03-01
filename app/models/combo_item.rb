# == Schema Information
#
# Table name: combo_items
#
#  id                 :integer          not null, primary key
#  model_number       :string
#  description        :string
#  upc                :string
#  vendor_cost        :decimal(, )      default(0.0)
#  retail_cost        :decimal(, )      default(0.0)
#  shipping_cost      :decimal(, )      default(0.0)
#  active             :boolean          default(TRUE)
#  remove_image       :boolean          default(FALSE)
#  notes              :text
#  details            :hstore
#  slug               :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class ComboItem < ApplicationRecord
  has_many :comments, as: :commentable
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

  def combo_select # "Model Number | Description"
    def a
      "#{model_number}"
    end
    def b
      if description.present?
        " | #{description}"
      else
        " | No Description Present"
      end
    end
    a+b
  end

  def combo_select_with_model # Brand Name (Model Number | Description)
    def a
      if product_brand_name.present?
        "#{product_brand_name}"
      else
        "No Brand Name Present"
      end
    end
    def b
      " (#{model_number}"
    end
    def c
      if description.present?
        " | #{description})"
      else
        " | No Description Present)"
      end
    end
    a+b+c
  end

end
