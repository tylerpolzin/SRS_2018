class AddMaxQuantityToProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :max_quantity, :integer
    add_column :parts, :max_quantity, :integer
  end
end
