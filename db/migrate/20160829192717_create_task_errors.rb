class CreateTaskErrors < ActiveRecord::Migration
  def change
    create_table :task_errors do |t|
    	t.references :task, foreign_key: true
    	t.integer :user_id
    	t.string :text
    	t.boolean :completed, default: false
      t.timestamps null: false
    end
  end
end
