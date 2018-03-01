class CreateItemUploads < ActiveRecord::Migration[5.1]
  def change
    create_table :item_uploads do |t|
      t.integer :upload_id
      t.integer :itemable_id
      t.string :itemable_type
    end
    add_index :item_uploads, [:itemable_type, :itemable_id]
    remove_column :uploads, :uploadable_id, :integer
    remove_column :uploads, :uploadable_type, :string
  end
end
