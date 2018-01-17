class CreateAssignments < ActiveRecord::Migration[5.1]
  def change
    create_table :assignments do |t|
      t.string :scaffold_association
      t.text :description
      t.text :wordy_details
      t.integer :priority
      t.boolean :active
      t.timestamps
      t.timestamps
    end
  end
end
