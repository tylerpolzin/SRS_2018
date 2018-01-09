class AddRemoveAttachedFilesToParts < ActiveRecord::Migration[5.1]
  def change
    add_column :parts, :remove_image, :boolean, :default => false
  end
end
