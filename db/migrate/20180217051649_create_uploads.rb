class CreateUploads < ActiveRecord::Migration[5.1]
  def change
    create_table :uploads do |t|
      t.string :description
      t.integer :product_id
      t.integer :part_id
      t.integer :user_id
      t.integer :upload_batch_id
      t.timestamps
    end
  end
end
