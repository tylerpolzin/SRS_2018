class Product < ApplicationRecord
  
  
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
  
  def product_ounces
    if self.weight_ounces == 0
      ""
    else
      "#{self.weight_ounces} oz."
    end
  end
  
  def product_weight
    if self.weight_pounds <2
      "#{self.weight_pounds} lb. #{self.product_ounces}"
    else
      "#{self.weight_pounds} lbs. #{self.product_ounces}"
    end
  end
  
end
