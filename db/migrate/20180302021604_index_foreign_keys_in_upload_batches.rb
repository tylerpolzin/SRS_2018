class IndexForeignKeysInUploadBatches < ActiveRecord::Migration[5.1]
  def change
    add_index :upload_batches, :user_id
  end
end
