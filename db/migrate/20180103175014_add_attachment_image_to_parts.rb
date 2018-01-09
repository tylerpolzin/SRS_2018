class AddAttachmentImageToParts < ActiveRecord::Migration[5.1]
  def self.up
    change_table :parts do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :parts, :image
  end
end
