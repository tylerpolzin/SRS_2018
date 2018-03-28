class CreateCustomers < ActiveRecord::Migration[5.1]
  def change
    create_table :customers do |t|
      t.string :firstname
      t.string :lastname
      t.string :company
      t.string :address1
      t.string :address2
      t.string :city
      t.string :state
      t.string :zipcode
      t.string :country
      t.string :phone
      t.string :email
      t.hstore :details
      t.float :lat, default: 0.000000
      t.float :long, default: 0.000000
      t.timestamps
    end
  end
end