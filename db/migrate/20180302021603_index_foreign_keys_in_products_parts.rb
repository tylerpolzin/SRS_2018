class IndexForeignKeysInProductsParts < ActiveRecord::Migration[5.1]
  def change
    add_index :products_parts, :part_id
    add_index :products_parts, :product_id
  end
end
