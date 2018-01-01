class ChangeProductsTable < ActiveRecord::Migration[5.1]
  def change
    change_column :products, :product_dims_l, :decimal
    change_column :products, :product_dims_w, :decimal
    change_column :products, :product_dims_h, :decimal
    change_column :products, :packaged_dims_l, :decimal
    change_column :products, :packaged_dims_w, :decimal
    change_column :products, :packaged_dims_h, :decimal
  end
end
