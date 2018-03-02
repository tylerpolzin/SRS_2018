# == Schema Information
#
# Table name: line_items
#
#  id                   :integer          not null, primary key
#  line_item_order_id   :integer
#  line_item_order_type :string
#  line_item_item_id    :integer
#  line_item_item_type  :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#

class LineItem < ApplicationRecord

  belongs_to :line_item_order, polymorphic: true
  belongs_to :line_item_item, polymorphic: true
  has_many :tracking_numbers

end
