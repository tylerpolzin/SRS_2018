class IndexForeignKeysInProfiles < ActiveRecord::Migration[5.1]
  def change
    add_index :profiles, :user_id
  end
end
