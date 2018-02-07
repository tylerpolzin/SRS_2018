class AddHstoreToParts < ActiveRecord::Migration[5.1]
  def change
    add_column :parts, :details, :hstore
    add_index :parts, :details, using: :gin
    add_column :profiles, :details, :hstore
    add_index :profiles, :details, using: :gin
  end
end