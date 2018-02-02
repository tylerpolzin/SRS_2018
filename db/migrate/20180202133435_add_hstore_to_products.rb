class AddHstoreToProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :details, :hstore
    add_index :products, :details, using: :gin
  end
end
