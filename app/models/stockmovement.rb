class Stockmovement < ApplicationRecord
  around_destroy :destroy_orphaned_parent # Deletes the Stockmovement Batch if the last child Stockmovement in the batch is deleted individually
  belongs_to :stockmovement_batch
  belongs_to :product, optional: true
  belongs_to :part, optional: true
  
  accepts_nested_attributes_for :product
  accepts_nested_attributes_for :part
  

  def destroy_orphaned_parent # see the 'around_destroy' entry at the top
    parent = self.stockmovement_batch
    yield # executes a DELETE database statement
    if parent.stockmovements.length == 0
      parent.destroy
    end
  end
  
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
