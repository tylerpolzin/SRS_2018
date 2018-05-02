# == Schema Information
#
# Table name: parts
#
#  id                        :integer          not null, primary key
#  manufacturer_model_number :string
#  srs_sku                   :string
#  store_orderable           :boolean          default(TRUE)
#  warranty_orderable        :boolean          default(TRUE)
#  ecomm_sku                 :boolean          default(FALSE)
#  upc                       :string
#  description               :text
#  weight_pounds             :integer          default(0)
#  weight_ounces             :integer          default(0)
#  product_dims_l            :integer          default(0)
#  product_dims_w            :integer          default(0)
#  product_dims_h            :integer          default(0)
#  packaged_dims_l           :integer          default(0)
#  packaged_dims_w           :integer          default(0)
#  packaged_dims_h           :integer          default(0)
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

class Part < ApplicationRecord
  include Itemable

  has_many :stockmovements
  has_many :comments, as: :commentable
  has_many :products_parts
  has_many :products, through: :products_parts

  has_many :line_items, as: :line_item_item
  has_many :ecomm_orders, through: :line_items
  has_many :warranty_orders, through: :line_items

  validates :products, presence: true
  validates :manufacturer_model_number, presence: true
  validates_uniqueness_of :manufacturer_model_number

  extend FriendlyId
  friendly_id :manufacturer_model_number, use: :slugged

  has_attached_file :image,
                    :styles => {:medium => "300x300>", :thumb => "100x100>" },
                    :default_url => "No_Image_Found"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\z/

  accepts_nested_attributes_for :uploads, :allow_destroy => true
  accepts_nested_attributes_for :products_parts, :allow_destroy => true

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

  def part_select # "MFR Model Number | Description"
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
    def b
      if description.present?
        " | #{description}"
      else
        " | No Description Present"
      end
    end
    a+b
  end

  def part_select_with_model # "Brand Name (MFR Model Number | Description)"
    def a
      if product_brand_name.present?
        "#{product_brand_name}"
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

  def quantity_on_hand # Shows current quantity in the Products table.  Grabs the last Stockmovement entry of a given Part ID to show the current stock on hand
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

  def product_model_select
    name = []
    if self.products.exists?
      self.products.last(1).each do |product|
        def a
          if product.manufacturer_model_number.present?
            "#{product.manufacturer_model_number}"
          else
            if product.srs_sku.present?
              "#{product.srs_sku}"
            else
              "No Model Number Present"
            end
          end
        end
        def b
          if product.description.present?
            " | #{product.description}"
          else
            " | No Description Present"
          end
        end
        name = a+b
      end
    else
      name = "N/A"
    end
  end

  def product_id
    id = []
    if self.products.exists?
      self.products.last(1).each do |product|
        id = product.id
      end
    end
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

  def part_ounces
    if self.weight_ounces == 0
      ""
    else
      "#{self.weight_ounces} oz."
    end
  end

  def part_weight
    if self.weight_pounds == 1
      "#{self.weight_pounds} lb. #{self.part_ounces}"
    else
      "#{self.weight_pounds} lbs. #{self.part_ounces}"
    end
  end

end
