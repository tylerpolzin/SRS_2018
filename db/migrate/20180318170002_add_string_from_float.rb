class AddStringFromFloat < ActiveRecord::Migration[5.1]
  def change
    change_column :customers, :lat, :string
    change_column :customers, :long, :string
    change_column :profiles, :lat, :string
    change_column :profiles, :long, :string
  end
end
