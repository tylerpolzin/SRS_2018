class Parts < ActiveRecord::Migration[5.1]
  def change
    create_table :parts do |t|
      t.integer :product_id
      t.string :manufacturer_model_number
      t.string :srs_sku
      t.boolean :store_orderable, default: true
      t.boolean :warranty_orderable, default: true
      t.boolean :ecomm_sku, default: false
      t.string :upc
      t.text :description
      t.integer :weight_pounds, default: 0
      t.integer :weight_ounces, default: 0
      t.integer :product_dims_l, default: 0
      t.integer :product_dims_w, default: 0
      t.integer :product_dims_h, default: 0
      t.integer :packaged_dims_l, default: 0
      t.integer :packaged_dims_w, default: 0
      t.integer :packaged_dims_h, default: 0
      t.string :location
      t.integer :count_on_hand, default: 0
      t.decimal :vendor_cost, default: "0.0"
      t.decimal :retail_cost, default: "0.0"
      t.decimal :shipping_cost, default: "0.0"
      t.boolean :active, default: true
      t.attachment :image
      t.boolean :remove_image, default: false
      t.text :notes
      t.timestamps
    end
  end
end