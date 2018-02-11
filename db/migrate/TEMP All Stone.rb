class CreateAllStoneOrderForm < ActiveRecord::Migration[5.1]
  def change
    create_table :all_stone_order_forms do |t|
      t.string :purchase_order_number
      t.integer :store_id
      t.string :store_phone
      t.string :customer_id
      t.string :color_choice_series
      t.string :color_choice
      t.string :edge_profile
      t.integer :width
      t.integer :depth
      t.string :top_size_range
      t.integer :backsplash_height
      t.boolean :sidesplash_left, default: false
      t.boolean :sidesplash_right, default: false
      t.boolean :profiled_end, default: false
      t.boolean :profiled_end_left, default: false
      t.boolean :profiled_end_right, default: false
      t.boolean :straight_cut, default: false
      t.boolean :straight_cut_left, default: false
      t.boolean :straight_cut_right, default: false
      t.string :end_treatment_type
      t.string :end_treatment_side
      t.string :sink_type
      t.string :sink_color
      t.string :faucet_spread
      t.string :sink_location_type
      t.boolean :sink_location_centered, default: true
      t.decimal :sink_location_measurement_a
      t.decimal :sink_location_measurement_b
      t.decimal :sink_location_measurement_c
      t.decimal :sink_location_measurement_d
      t.boolean :additional_top, default: false
      t.timestamps
    end
  end
end

class CreateAllStoneOrderPrice < ActiveRecord::Migration[5.1]
  def change
    create_table :all_stone_order_prices do |t|
      t.decimal :a_series_pricing
      t.decimal :b_series_pricing
      t.decimal :double_bowl_price
      t.decimal :rectangular_bowl_price
      t.decimal :ogee_edge_price
      t.decimal :sidesplash_left_price
      t.decimal :sidesplash_right_price
      t.decimal :freight_price
      t.decimal :additional_top_price
      t.timestamps
    end
  end
end

class CreateCustomer < ActiveRecord::Migration[5.1]
  def change
    create_table :customers do |t|
      t.string :first_name
      t.string :last_name
      t.string :company
      t.string :address_1
      t.string :address_2
      t.string :address_3
      t.string :country
      t.string :city
      t.string :state
      t.string :zipcode
      t.string :phone_1
      t.string :phone_2
      t.string :email
      t.float :lat
      t.float :long
      t.timestamps
    end
  end
end

class MenardsStores < ActiveRecord::Migration[5.0]
  def change
    create_table :menards_stores do |t|
      t.integer :yard
      t.string :abbrv
      t.string :name
      t.string :prototype
      t.string :address
      t.string :city
      t.string :state
      t.string :zipcode
      t.float :lat
      t.float :long
      t.string :phone
      t.string :service_rep
      t.integer :user_id
      t.text :notes
      t.date :last_visit
      t.timestamps
    end
  end
end
