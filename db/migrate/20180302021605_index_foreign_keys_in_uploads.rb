class IndexForeignKeysInUploads < ActiveRecord::Migration[5.1]
  def change
    add_index :uploads, :upload_batch_id
  end
end
