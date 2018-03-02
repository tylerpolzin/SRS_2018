class IndexForeignKeysInComboProducts < ActiveRecord::Migration[5.1]
  def change
    add_index :combo_products, :combo_item_id
    add_index :combo_products, :product_id
  end
end
