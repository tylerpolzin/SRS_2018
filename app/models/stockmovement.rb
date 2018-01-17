class Stockmovement < ApplicationRecord
  belongs_to :stockmovement_batch
  belongs_to :product, optional: true
  belongs_to :part, optional: true
  
  accepts_nested_attributes_for :product
  accepts_nested_attributes_for :part
  
  def is_product
    self.product_id.present?
  end
  
  def is_part
    self.part_id.present?
  end
  
  def adjust_quantity_plus # Adds a "+" symbol to adjustment quantities if it is a positive integer
    if self.adjust_quantity < 0
      self.adjust_quantity
    elsif self.adjust_quantity == 0
      "0"
    else
      "+#{self.adjust_quantity}"
    end
  end
end
