class Part < ApplicationRecord
  belongs_to :product
  has_many :stockmovements
  
  validates :product_id, presence: true
  
  has_attached_file :image,
                    :styles => {:medium => "300x300>", :thumb => "100x100>" },
                    :default_url => "No_Image_Found"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\z/
  
  def part_select # "MFR Model Number | Description"
    def a
      if manufacturer_model_number.present?
        "#{manufacturer_model_number}"
      else
        "No Model Number Present"
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
