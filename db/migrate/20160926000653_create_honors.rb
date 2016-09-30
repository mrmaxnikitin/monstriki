class CreateHonors < ActiveRecord::Migration
  def change
    create_table :honors do |t|
    	t.references :user, foreign_key: true
    	t.references :quest, foreign_key: true

    	t.integer :price, default: 50
    	t.integer :honor_type
    	t.integer :degree
    	t.boolean :paid,  default: false
    	t.string  :name
    	t.string  :age
    	t.string  :school
    	t.string  :curator

      t.timestamps null: false
    end
    add_index :honors, :user_id
    add_index :honors, [:user_id, :quest_id], unique: true
  end
end
