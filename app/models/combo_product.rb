class ComboProduct < ApplicationRecord
  belongs_to :combo_item
  belongs_to :product
end
