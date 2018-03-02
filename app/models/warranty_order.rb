# == Schema Information
#
# Table name: warranty_orders
#
#  id                    :integer          not null, primary key
#  task_id               :integer
#  customer_name         :string
#  order_number          :string
#  ecomm_order_reference :integer
#  details               :hstore
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#

class WarrantyOrder < ApplicationRecord

  belongs_to :task
  has_many :line_items
  belongs_to :ecomm_order, optional: true

end
