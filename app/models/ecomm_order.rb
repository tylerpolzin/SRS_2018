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
  has_many :line_items
  has_many :warranty_orders

end
