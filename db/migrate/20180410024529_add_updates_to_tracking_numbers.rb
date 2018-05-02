class AddUpdatesToTrackingNumbers < ActiveRecord::Migration[5.1]
  def change
    change_column :tracking_numbers, :shipping_cost, :decimal, default: "0.0"
  end
end
