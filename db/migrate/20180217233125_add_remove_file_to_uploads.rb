class AddRemoveFileToUploads < ActiveRecord::Migration[5.1]
  def change
    add_column :uploads, :remove_file, :boolean, default: false
  end
end
