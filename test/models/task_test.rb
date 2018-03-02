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
#  user_id          :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
