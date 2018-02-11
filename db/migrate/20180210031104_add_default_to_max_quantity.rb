class AddDefaultToMaxQuantity < ActiveRecord::Migration[5.1]
  def change
    change_column :products, :max_quantity, :integer, default: 0
    change_column :parts, :max_quantity, :integer, default: 0
  end
end