class CreateComboItems < ActiveRecord::Migration[5.1]
  def change
    create_table :combo_items do |t|
      t.string :model_number
      t.string :description
      t.string :upc
      t.decimal :vendor_cost, default: "0.0"
      t.decimal :retail_cost, default: "0.0"
      t.decimal :shipping_cost, default: "0.0"
      t.boolean :active, default: true
      t.boolean :remove_image, default: false
      t.text :notes
      t.hstore :details
      t.string :slug
      t.timestamps
      t.index :details, using: :gin
      t.index :slug
    end
  end
end
