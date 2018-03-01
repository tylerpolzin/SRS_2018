class AddUploadableToUploads < ActiveRecord::Migration[5.1]
  def change
    add_column :uploads, :uploadable_id, :integer
    add_column :uploads, :uploadable_type, :string
    remove_column :uploads, :product_id, :integer
    remove_column :uploads, :part_id, :integer
    remove_column :uploads, :user_id, :integer
    add_index :uploads, [:uploadable_type, :uploadable_id]
  end
end