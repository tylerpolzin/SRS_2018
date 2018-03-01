class AddTimestampsToItemUpload < ActiveRecord::Migration[5.1]
  def change
    add_column :item_uploads, :created_at, :datetime
    add_column :item_uploads, :updated_at, :datetime
  end
end
