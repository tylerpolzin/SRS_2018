# == Schema Information
#
# Table name: stores
#
#  id             :integer          not null, primary key
#  yard           :integer
#  abbrv          :string
#  name           :string
#  prototype      :string
#  address        :string
#  city           :string
#  state          :string
#  zipcode        :string
#  lat            :float
#  long           :float
#  phone          :string
#  service_rep    :string
#  service_rep_id :integer
#  lastvisit      :date
#  details        :hstore
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Store < ApplicationRecord
end
