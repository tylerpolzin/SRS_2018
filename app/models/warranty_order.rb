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
#  customer_id           :integer
#  status                :string           default("New")
#  due_date              :datetime
#  completion_date       :datetime
#  cancellation_reason   :string
#  active                :boolean          default(TRUE)
#  requested_carrier     :string
#  requested_method      :string
#

class WarrantyOrder < ApplicationRecord

  belongs_to :task
  has_many :line_items, dependent: :destroy
  belongs_to :customer, optional: true
  belongs_to :ecomm_order, optional: true
  has_many :comments, as: :commentable, dependent: :destroy

  accepts_nested_attributes_for :customer, :allow_destroy => true, :reject_if => :customer_blank
  accepts_nested_attributes_for :comments, :allow_destroy => true, :reject_if => :comment_blank
  accepts_nested_attributes_for :line_items, :allow_destroy => true, :reject_if => :item_id_blank

  def customer_blank(a)
    self.new_record? && a[:firstname].blank?
  end

  def comment_blank(a) # If a item is added to the batch, but an item is not selected in that field, it is automatically rejected & deleted.
    self.new_record? && a[:content].blank?
  end

  def item_id_blank(a) # If a item is added to the batch, but an item is not selected in that field, it is automatically rejected & deleted.
    self.new_record? && a[:product_id].blank? && a[:part_id].blank? && a[:combo_item_id].blank?
  end

  def dropdown_select
    "Order ##{order_number} for #{customer.name} (#{status})"
  end

  def due_date_trunc
    if self.due_date.present?
      self.due_date.strftime("%Y-%m-%d")
    else
      self.due_date
    end
  end
  
  def completion_date_trunc
    if self.completion_date.present?
      self.completion_date.strftime("%Y-%m-%d")
    else
      self.completion_date
    end
  end
  
  def requested_ship_method
    a = []
    b = []
    if self.requested_carrier.present?
      a = self.requested_carrier
    else
      a = "No Carrier Specified"
    end
    if self.requested_method.present?
      b = self.requested_method
    else
      b = "No Method Specified"
    end
    a + ", " + b
  end


end
