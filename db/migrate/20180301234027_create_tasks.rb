class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.references :initiated_by
      t.references :initiated_for
      t.string :task_type
      t.boolean :active
      t.string :status
      t.datetime :due_date
      t.datetime :completion_date
      t.hstore :details, index: true
      t.belongs_to :user, foreign_key: :initiated_by, index: true, null: false
      t.timestamps null: false
    end
  end
end
