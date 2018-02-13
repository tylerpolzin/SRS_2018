class IndexForeignKeysInParts < ActiveRecord::Migration[5.1]
  def change
    add_index :parts, :product_id
  end
end
