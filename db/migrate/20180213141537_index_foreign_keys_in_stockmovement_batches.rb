class IndexForeignKeysInStockmovementBatches < ActiveRecord::Migration[5.1]
  def change
    add_index :stockmovement_batches, :stockmovement_id
    add_index :stockmovement_batches, :user_id
  end
end
