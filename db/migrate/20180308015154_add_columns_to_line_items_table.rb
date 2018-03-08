class AddColumnsToLineItemsTable < ActiveRecord::Migration[5.1]
  def change
    add_column :line_items, :ecomm_order_id, :integer
    add_column :line_items, :warranty_order_id, :integer
    remove_column :line_items, :line_item_order_id, :integer
    remove_column :line_items, :line_item_item_id, :integer
    remove_column :line_items, :line_item_order_type, :string
    remove_column :line_items, :line_item_item_type, :string
  end
end
