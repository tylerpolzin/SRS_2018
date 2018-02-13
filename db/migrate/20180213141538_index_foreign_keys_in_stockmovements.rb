class IndexForeignKeysInStockmovements < ActiveRecord::Migration[5.1]
  def change
    add_index :stockmovements, :part_id
    add_index :stockmovements, :product_id
    add_index :stockmovements, :stockmovement_batch_id
  end
end
