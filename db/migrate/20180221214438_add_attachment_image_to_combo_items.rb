class AddAttachmentImageToComboItems < ActiveRecord::Migration[5.1]
  def self.up
    change_table :combo_items do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :combo_items, :image
  end
end
