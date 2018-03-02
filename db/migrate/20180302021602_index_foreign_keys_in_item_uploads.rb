class IndexForeignKeysInItemUploads < ActiveRecord::Migration[5.1]
  def change
    add_index :item_uploads, :upload_id
  end
end
