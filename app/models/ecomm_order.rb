# == Schema Information
#
# Table name: ecomm_orders
#
#  id            :integer          not null, primary key
#  task_id       :integer
#  retailer      :string
#  customer_name :string
#  order_number  :string
#  order_date    :datetime
#  details       :hstore
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class EcommOrder < ApplicationRecord

  belongs_to :task
  has_many :line_items#, inverse_of: :ecomm_orders
  #has_many :products, through: :line_items
  #has_many :parts, through: :line_items
  #has_many :combo_items, through: :line_items
  has_many :warranty_orders

  accepts_nested_attributes_for :line_items, :allow_destroy => true

end
