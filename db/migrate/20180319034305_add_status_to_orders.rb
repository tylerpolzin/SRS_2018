class AddStatusToOrders < ActiveRecord::Migration[5.1]
  def change
    add_column :warranty_orders, :status, :string, default: "New"
    add_column :warranty_orders, :due_date, :datetime
    add_column :warranty_orders, :completion_date, :datetime
    add_column :warranty_orders, :cancellation_reason, :string
    add_column :warranty_orders, :active, :boolean, default: true
    add_column :ecomm_orders, :status, :string, default: "New"
    add_column :ecomm_orders, :due_date, :datetime
    add_column :ecomm_orders, :completion_date, :datetime
    add_column :ecomm_orders, :cancellation_reason, :string
    add_column :ecomm_orders, :active, :boolean, default: true
    change_column :tasks, :active, :boolean, default: true
    add_column :line_items, :item_cost, :decimal, default: 0.00
  end
end
