class RemoveStockmovementIdFromStockmovementBatches < ActiveRecord::Migration[5.1]
  def change
    remove_column :stockmovement_batches, :stockmovement_id, :integer
  end
end
