class AddCustomerIdToWarrantyOrder < ActiveRecord::Migration[5.1]
  def change
    add_column :warranty_orders, :customer_id, :integer
  end
end
