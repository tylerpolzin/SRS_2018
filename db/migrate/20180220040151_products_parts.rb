class ProductsParts < ActiveRecord::Migration[5.1]
  def change
    create_table :products_parts do |t|
      t.integer :product_id
      t.integer :part_id
      t.timestamps
    end
  end
end
