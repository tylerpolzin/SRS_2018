# == Schema Information
#
# Table name: products
#
#  id                        :integer          not null, primary key
#  vendor_name               :string
#  brand_name                :string
#  manufacturer_model_number :string
#  srs_sku                   :string
#  store_orderable           :boolean          default(FALSE)
#  warranty_orderable        :boolean          default(FALSE)
#  ecomm_sku                 :boolean          default(FALSE)
#  upc                       :string
#  description               :text
#  weight_pounds             :integer          default(0)
#  weight_ounces             :integer          default(0)
#  product_dims_l            :decimal(, )      default(0.0)
#  product_dims_w            :decimal(, )      default(0.0)
#  product_dims_h            :decimal(, )      default(0.0)
#  packaged_dims_l           :decimal(, )      default(0.0)
#  packaged_dims_w           :decimal(, )      default(0.0)
#  packaged_dims_h           :decimal(, )      default(0.0)
#  location                  :string
#  count_on_hand             :integer          default(0)
#  vendor_cost               :decimal(, )      default(0.0)
#  retail_cost               :decimal(, )      default(0.0)
#  shipping_cost             :decimal(, )      default(0.0)
#  active                    :boolean          default(TRUE)
#  image_file_name           :string
#  image_content_type        :string
#  image_file_size           :integer
#  image_updated_at          :datetime
#  remove_image              :boolean          default(FALSE)
#  notes                     :text
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  details                   :hstore
#  max_quantity              :integer          default(0)
#  slug                      :string
#

class Product < ApplicationRecord
  include Itemable

  has_many :stockmovements
  has_many :comments, as: :commentable
  has_many :products_parts
  has_many :parts, through: :products_parts

  has_many :combo_products
  has_many :combo_items, through: :combo_products

  has_many :line_items#, inverse_of: :products
  has_many :ecomm_orders, through: :line_items
  has_many :warranty_orders, through: :line_items

  validates :manufacturer_model_number, presence: true
  validates_uniqueness_of :manufacturer_model_number
  # validates_format_of :manufacturer_model_number, :with => /\A[a-z0-9]+\z/i

  extend FriendlyId
  friendly_id :manufacturer_model_number, use: :slugged

  has_attached_file :image,
                    :styles => {:medium => "300x300>", :thumb => "100x100>", :xsmall => "60x60>" },
                    :default_url => "No_Image_Found"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\z/

  accepts_nested_attributes_for :parts, :allow_destroy => true
  accepts_nested_attributes_for :uploads, :allow_destroy => true
  
  def file_blank(a)
    a[:id].blank?
  end

  def sku_if_sku  # Takes preference to showing the SRS SKU over the MFR Model Number if it exists
    if self.srs_sku.present?
      self.srs_sku
    else
      if self.manufacturer_model_number.present?
        self.manufacturer_model_number
      else
        "View Product"
      end
    end
  end

  def product_select # "Brand Name (Description)"
    def a
      if brand_name.present?
        "#{brand_name}"
      else
        "No Brand Name Present"
      end
    end
    def b
      if description.present?
        " (#{description})"
      else
        "No Description Present"
      end
    end
    a+b
  end

  def model_select # "MFR Model Number / SRS SKU | Description"
    def a
      if manufacturer_model_number.present?
        "#{manufacturer_model_number}"
      else
        if srs_sku.present?
          "#{srs_sku}"
        else
          "No Model Number Present"
        end
      end
    end
    def s
      if srs_sku.present?
        " / #{srs_sku}"
      else
        ""
      end
    end
    def b
      if description.present?
        " | #{description}"
      else
        " | No Description Present"
      end
    end
    a+s+b
  end
  
  def product_select_with_model # "Brand Name (MFR Model Number | Description)"
    def a
      if brand_name.present?
        "#{brand_name}"
      else
        "No Brand Name Present"
      end
    end
    def b
      if manufacturer_model_number.present?
        " (#{manufacturer_model_number}"
      else
        " (No Model Number Present"
      end
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
  
  def id_w_leading_zero # Displays ID's that are less than 100 as "001"-"099", used when manually linking attached image URL's where the helper doesn't work
    if self.id < 100 # Keep an eye on this in case the DB is close to passing 1,000
      if self.id < 10
        "00#{self.id}"
      else
        "0#{self.id}"
      end
    else
      self.id
    end
  end
  
  def quantity_on_hand # Shows current quantity in the Products table.  Grabs the last Stockmovement entry of a given Product ID to show the current stock on hand
    quantity = []
    if self.stockmovements.exists?
      self.stockmovements.last(1).each do |s|
        quantity = s.quantity
      end
    else
      if self.count_on_hand == nil
        "0"
      else
        quantity = self.count_on_hand
      end
    end
    quantity
  end
  
  def quantity_eoy # Shows quantity for End Of Year purposes
    quantity = []
    if self.stockmovements.exists?
      self.stockmovements.where(:created_at => '2018-12-17'..'2018-12-31').last(1).each do |s|
        quantity = s.quantity
      end
    else
      if self.count_on_hand == nil
        "0"
      else
        quantity = self.count_on_hand
      end
    end
    quantity
  end
  
  def qty_last_updated
    last_update = []
    if self.stockmovements.exists?
      self.stockmovements.last(1).each do |s|
        last_update = s.created_at.strftime('%Y-%m-%d (%R)')
      end
    else
      last_update = "N/A"
    end
    last_update
  end

  def request_quantity
    quantity = []
    quantity = self.max_quantity - self.quantity_on_hand
    if quantity > 0
      quantity
    else
      quantity = 0
    end
    quantity
  end

  def image_html_dev
    "<a target='_blank' title='View Full Size Image' href='/system/products/images/000/000/#{self.id_w_leading_zero}/original/#{self.image.original_filename}'><img src='/system/products/images/000/000/#{self.id_w_leading_zero}/xsmall/#{self.image.original_filename}' alt='#{self.image.original_filename}'></a>"
  end

  def image_html_prod
    "<a target='_blank' title='View Full Size Image' href='//s3-us-east-2.amazonaws.com/srs-file-uploads/products/images/000/000/#{self.id_w_leading_zero}/original/#{self.image.original_filename}'><img src='//s3-us-east-2.amazonaws.com/srs-file-uploads/products/images/000/000/#{self.id_w_leading_zero}/xsmall/#{self.image.original_filename}' alt='#{self.image.original_filename}'></a>"
  end

  def product_ounces
    if self.weight_ounces == 0
      ""
    else
      "#{self.weight_ounces} oz."
    end
  end
  
  def product_weight
    if self.weight_pounds == 1
      "#{self.weight_pounds} lb. #{self.product_ounces}"
    else
      "#{self.weight_pounds} lbs. #{self.product_ounces}"
    end
  end

  def meta_notes_expando
    
  end

end
