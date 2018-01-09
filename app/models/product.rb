class Product < ApplicationRecord
  has_many :stockmovements
  has_many :parts
  
  has_attached_file :image,
                    :styles => {:medium => "300x300>", :thumb => "100x100>" },
                    :default_url => "No_Image_Found"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\z/
  
  accepts_nested_attributes_for :parts, :allow_destroy => true

  def sku_if_sku
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
  
  def product_select
    "#{brand_name} (#{description})"
  end
  
  def model_select
    "#{manufacturer_model_number} | #{description}"
  end
  
  def product_select_with_model
    "#{brand_name} (#{manufacturer_model_number} | #{description})"
  end
  
  def id_w_leading_zero # Displays ID's that are less than 100 as "001"-"099", used when manually linking attached image URL's where the helper doesn't work
    if self.id < 100
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
      quantity = 0
    end
    quantity
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
  
end
