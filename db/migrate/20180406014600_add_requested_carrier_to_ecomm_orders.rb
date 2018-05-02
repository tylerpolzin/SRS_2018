class AddRequestedCarrierToEcommOrders < ActiveRecord::Migration[5.1]
  def change
    add_column :ecomm_orders, :requested_carrier, :string
    add_column :ecomm_orders, :requested_method, :string
    add_column :warranty_orders, :requested_carrier, :string
    add_column :warranty_orders, :requested_method, :string
  end
end
