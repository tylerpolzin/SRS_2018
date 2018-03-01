class AddUploadedByToUpload < ActiveRecord::Migration[5.1]
  def change
    add_column :uploads, :uploaded_by, :integer
  end
end
