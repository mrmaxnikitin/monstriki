class CreateUserMonsters < ActiveRecord::Migration
  def change
    create_table :user_monsters do |t|
      t.string :name
      t.references :user, foreign_key: true
    	t.references :monster
      t.timestamps null: false
    end
    add_index :user_monsters, :user_id
  end
end
