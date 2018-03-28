# == Schema Information
#
# Table name: ecomm_orders
#
#  id                  :integer          not null, primary key
#  task_id             :integer
#  retailer            :string
#  customer_name       :string
#  order_number        :string
#  order_date          :datetime
#  details             :hstore
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  status              :string           default("New")
#  due_date            :datetime
#  completion_date     :datetime
#  cancellation_reason :string
#  active              :boolean          default(TRUE)
#

class EcommOrder < ApplicationRecord

  belongs_to :task
  has_many :line_items, dependent: :destroy
  has_many :warranty_orders
  has_many :comments, as: :commentable, dependent: :destroy

  accepts_nested_attributes_for :comments, :allow_destroy => true, :reject_if => :comment_blank
  accepts_nested_attributes_for :line_items, :allow_destroy => true, :reject_if => :item_id_blank
  
  def comment_blank(a)
    a[:content].blank?
  end

  def item_id_blank(a) # If a item is added to the batch, but an item is not selected in that field, it is automatically rejected & deleted.
    self.new_record? && a[:product_id].blank? && a[:part_id].blank? && a[:combo_item_id].blank?
  end

  def ecomm_select
    "#{retailer} order for #{customer_name} | Order ##{order_number} | Order created on #{created_at.strftime("%A, %B %-d, %Y")}"
  end

  def order_date_trunc
    if self.order_date.present?
      self.order_date.strftime("%Y-%m-%d")
    else
      self.order_date
    end
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

end
