class StockMovements < ActiveRecord::Migration[5.1]
  def change
    create_table :stockmovements do |t|
      t.integer :product_id
      t.integer :part_id
      t.integer :quantity
      t.integer :adjust_quantity
      t.integer :stockmovement_batch_id
      t.timestamps
    end
  end
end
