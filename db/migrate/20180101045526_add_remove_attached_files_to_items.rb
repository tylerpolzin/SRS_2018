class AddRemoveAttachedFilesToItems < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :remove_image, :boolean, :default => false
  end
end
