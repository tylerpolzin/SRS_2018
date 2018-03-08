class AddProductIdToLineItem < ActiveRecord::Migration[5.1]
  def change
    add_column :line_items, :product_id, :integer
    add_column :line_items, :part_id, :integer
    add_column :line_items, :combo_item_id, :integer
  end
end
