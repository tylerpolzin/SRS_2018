class CreateStores < ActiveRecord::Migration[5.1]
  def change
    create_table :stores do |t|
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
      t.integer :service_rep_id
      t.date :lastvisit
      t.hstore :details
      t.timestamps
    end
  end
end
