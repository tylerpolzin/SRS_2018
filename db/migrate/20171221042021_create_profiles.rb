class CreateProfiles < ActiveRecord::Migration[5.1]
  def change
    create_table :profiles do |t|
      t.integer :user_id
      t.string :name
      t.string :company
      t.string :position
      t.string :address
      t.string :city
      t.string :state
      t.string :zipcode
      t.string :phone1
      t.string :phone1_type
      t.string :phone2
      t.string :phone2_type
      t.string :email
      t.text :notes
      t.float :lat
      t.float :long
      t.timestamps
    end
  end
end
