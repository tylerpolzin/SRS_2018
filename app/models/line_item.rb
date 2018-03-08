# == Schema Information
#
# Table name: line_items
#
#  id                :integer          not null, primary key
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  quantity          :integer          default(0)
#  product_id        :integer
#  part_id           :integer
#  combo_item_id     :integer
#  ecomm_order_id    :integer
#  warranty_order_id :integer
#

class LineItem < ApplicationRecord

  belongs_to :ecomm_order, optional: true
  belongs_to :warranty_order, optional: true
  belongs_to :product, optional: true
  belongs_to :part, optional: true
  belongs_to :combo_item, optional: true
  
  has_many :tracking_numbers

  accepts_nested_attributes_for :tracking_numbers, :allow_destroy => true

end
