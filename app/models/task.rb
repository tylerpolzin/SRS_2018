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

  include Itemable

  has_many :ecomm_orders
  has_many :warranty_orders
  belongs_to :user

  validates_presence_of :task_type
  validates_presence_of :initiated_for_id

end
