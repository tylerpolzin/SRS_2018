# == Schema Information
#
# Table name: line_items
#
#  id                :integer          not null, primary key
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  quantity          :integer          default(0)
#  product_id        :integer
#  part_id           :integer
#  combo_item_id     :integer
#  ecomm_order_id    :integer
#  warranty_order_id :integer
#  item_cost         :decimal(, )      default(0.0)
#

class LineItem < ApplicationRecord

  belongs_to :ecomm_order, optional: true
  belongs_to :warranty_order, optional: true
  belongs_to :product, optional: true
  belongs_to :part, optional: true
  belongs_to :combo_item, optional: true
  
  has_many :tracking_numbers, dependent: :destroy

  accepts_nested_attributes_for :tracking_numbers, :allow_destroy => true, :reject_if => :tracking_number_blank

  def tracking_number_blank(a) # If a item is added to the batch, but an item is not selected in that field, it is automatically rejected & deleted.
    self.new_record? && a[:tracking_number].blank?
  end
  
  def item_select
    if self.product_id.present?
      "<a target='_blank' href='/products/#{product.slug}' title='View Product Details (ID: #{product_id})'>#{product.product_select_with_model}</a>".html_safe
    elsif self.part_id.present?
      "<a target='_blank' href='/parts/#{part.slug}' title='View Part Details (ID: #{part_id})'>#{part.part_select_with_model}</a>".html_safe
    elsif self.combo_item_id.present?
      "<a target='_blank' href='/combo_items/#{combo_item.slug}' title='View Combo Item Details (ID: #{combo_item_id})'>#{combo_item.combo_select_with_model}</a>".html_safe
    end
  end

end
