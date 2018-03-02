class CreateLineItems < ActiveRecord::Migration[5.1]
  def change
    create_table :line_items do |t|
      t.integer :line_item_order_id
      t.string :line_item_order_type
      t.integer :line_item_item_id
      t.string :line_item_item_type
      t.timestamps
    end
    add_index :line_items, [:line_item_order_id, :line_item_order_type]
    add_index :line_items, [:line_item_item_id, :line_item_item_type]
  end
end
