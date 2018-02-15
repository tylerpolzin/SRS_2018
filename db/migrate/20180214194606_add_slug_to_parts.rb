class AddSlugToParts < ActiveRecord::Migration[5.1]
  def change
    add_column :parts, :slug, :string
    add_index :parts, :slug
  end
end
