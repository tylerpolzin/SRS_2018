class CreateComboProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :combo_products do |t|
      t.integer :combo_item_id
      t.integer :product_id
      t.timestamps
    end
  end
end
