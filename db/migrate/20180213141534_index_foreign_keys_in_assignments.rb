class IndexForeignKeysInAssignments < ActiveRecord::Migration[5.1]
  def change
    add_index :assignments, :user_id
  end
end
