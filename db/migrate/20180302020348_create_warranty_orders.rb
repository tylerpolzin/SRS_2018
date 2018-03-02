class CreateWarrantyOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :warranty_orders do |t|
      t.integer :task_id, index: true
      t.string :customer_name
      t.string :order_number
      t.integer :ecomm_order_reference
      t.hstore :details, index: true
      t.timestamps
    end
  end
end
