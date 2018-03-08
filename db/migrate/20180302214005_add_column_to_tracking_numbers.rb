class AddColumnToTrackingNumbers < ActiveRecord::Migration[5.1]
  def change
    add_column :tracking_numbers, :shipping_method, :string
  end
end
