# == Schema Information
#
# Table name: tasks
#
#  id               :integer          not null, primary key
#  name             :string
#  initiated_by_id  :integer
#  initiated_for_id :integer
#  task_type        :string
#  active           :boolean          default(TRUE)
#  status           :string
#  due_date         :datetime
#  completion_date  :datetime
#  details          :hstore
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Task < ApplicationRecord

  include Itemable # has_many :uploads
  has_many :ecomm_orders
  has_many :warranty_orders
  has_many :comments, as: :commentable, dependent: :destroy
  belongs_to :initiated_by, class_name: "User"
  belongs_to :initiated_for, class_name: "User"


  validates_presence_of :task_type
  validates_presence_of :initiated_for_id

  accepts_nested_attributes_for :comments, :allow_destroy => true, :reject_if => :comment_blank
  accepts_nested_attributes_for :uploads, :allow_destroy => true
  accepts_nested_attributes_for :ecomm_orders, :allow_destroy => true, :reject_if => :retailer_blank
  accepts_nested_attributes_for :warranty_orders, :allow_destroy => true, :reject_if => :order_number_blank

  def comment_blank(a)
    a[:content].blank?
  end
  
  def retailer_blank(a)
    a[:retailer].blank?
  end
  
  def order_number_blank(a)
    a[:order_number].blank?
  end

  def is_ecomm_order
    self.task_type == "E-Commerce Orders"
  end
  
  def is_customer_order
    self.task_type == "Customer Orders"
  end

  def is_store_order
    self.task_type == "Store Order"
  end

  def is_basic_task
    self.task_type == "Basic Task"
  end

  def due_date_trunc
    if self.due_date.present?
      self.due_date.strftime("%Y-%m-%d")
    else
      self.due_date
    end
  end

end
