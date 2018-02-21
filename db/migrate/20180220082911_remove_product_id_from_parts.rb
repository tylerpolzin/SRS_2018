class RemoveProductIdFromParts < ActiveRecord::Migration[5.1]
  def change
    remove_column :parts, :product_id, :integer
  end
end
