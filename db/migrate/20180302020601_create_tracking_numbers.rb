class CreateTrackingNumbers < ActiveRecord::Migration[5.1]
  def change
    create_table :tracking_numbers do |t|
      t.integer :line_item_id, index: true
      t.string :carrier
      t.string :tracking_number
      t.decimal :shipping_cost
      t.datetime :ship_date
      t.timestamps
    end
  end
end
