# == Schema Information
#
# Table name: combo_products
#
#  id            :integer          not null, primary key
#  combo_item_id :integer
#  product_id    :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class ComboProduct < ApplicationRecord
  belongs_to :combo_item
  belongs_to :product
end
