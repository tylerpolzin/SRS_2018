# == Schema Information
#
# Table name: products
#
#  id                        :integer          not null, primary key
#  vendor_name               :string
#  brand_name                :string
#  manufacturer_model_number :string
#  srs_sku                   :string
#  store_orderable           :boolean          default(FALSE)
#  warranty_orderable        :boolean          default(FALSE)
#  ecomm_sku                 :boolean          default(FALSE)
#  upc                       :string
#  description               :text
#  weight_pounds             :integer          default(0)
#  weight_ounces             :integer          default(0)
#  product_dims_l            :decimal(, )      default(0.0)
#  product_dims_w            :decimal(, )      default(0.0)
#  product_dims_h            :decimal(, )      default(0.0)
#  packaged_dims_l           :decimal(, )      default(0.0)
#  packaged_dims_w           :decimal(, )      default(0.0)
#  packaged_dims_h           :decimal(, )      default(0.0)
#  location                  :string
#  count_on_hand             :integer          default(0)
#  vendor_cost               :decimal(, )      default(0.0)
#  retail_cost               :decimal(, )      default(0.0)
#  shipping_cost             :decimal(, )      default(0.0)
#  active                    :boolean          default(TRUE)
#  image_file_name           :string
#  image_content_type        :string
#  image_file_size           :integer
#  image_updated_at          :datetime
#  remove_image              :boolean          default(FALSE)
#  notes                     :text
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  details                   :hstore
#  max_quantity              :integer          default(0)
#  slug                      :string
#

require 'test_helper'

class ProductTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
