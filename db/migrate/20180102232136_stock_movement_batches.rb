class StockMovementBatches < ActiveRecord::Migration[5.1]
  def change
    create_table :stockmovement_batches do |t|
      t.integer :stockmovement_id
      t.integer :user_id
      t.string :stockmovement_type
      t.text :notes
      t.timestamps
    end
  end
end
