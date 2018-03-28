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
#

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

end
