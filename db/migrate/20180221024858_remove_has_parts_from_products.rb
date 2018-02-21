class RemoveHasPartsFromProducts < ActiveRecord::Migration[5.1]
  def change
    remove_column :products, :has_parts, :boolean
  end
end
