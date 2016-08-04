class CreateUserThings < ActiveRecord::Migration
  def change
    create_table :user_things do |t|
    	t.integer :active_thing
    	t.references :user, foreign_key: true
    	t.references :thing, foreign_key: true

      t.timestamps null: false
    end
    add_index :user_things, :user_id
    add_index :user_things, :thing_id
    add_index :user_things, [:user_id, :thing_id], unique: true
  end
end
