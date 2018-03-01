# == Schema Information
#
# Table name: products_parts
#
#  id         :integer          not null, primary key
#  product_id :integer
#  part_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ProductsPart < ApplicationRecord
  belongs_to :product
  belongs_to :part
end
