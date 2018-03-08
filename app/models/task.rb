# == Schema Information
#
# Table name: tasks
#
#  id               :integer          not null, primary key
#  name             :string
#  initiated_by_id  :integer
#  initiated_for_id :integer
#  task_type        :string
#  active           :boolean
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
  has_many :line_items, through: :ecomm_orders
  has_many :warranty_orders
  belongs_to :user, foreign_key: :initiated_by_id

  validates_presence_of :task_type
  validates_presence_of :initiated_for_id

  accepts_nested_attributes_for :uploads, :allow_destroy => true
  accepts_nested_attributes_for :ecomm_orders, :allow_destroy => true
  accepts_nested_attributes_for :warranty_orders, :allow_destroy => true
  #accepts_nested_attributes_for :line_items, :allow_destroy => true


end
