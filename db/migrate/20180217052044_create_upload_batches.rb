class CreateUploadBatches < ActiveRecord::Migration[5.1]
  def change
    create_table :upload_batches do |t|
      t.text :notes
      t.integer :user_id
      t.timestamps
    end
  end
end
