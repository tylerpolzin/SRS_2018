class CreateEcommOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :ecomm_orders do |t|
      t.integer :task_id, index: true
      t.string :retailer
      t.string :customer_name
      t.string :order_number
      t.datetime :order_date
      t.hstore :details, index: true
      t.timestamps
    end
  end
end
