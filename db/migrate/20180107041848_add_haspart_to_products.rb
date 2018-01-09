class AddHaspartToProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :has_parts, :boolean, :default => false
  end
end
