class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
    	t.integer 	 :current_quest, default: 1
        t.boolean    :complete_quest, default: false
    	t.references :user, foreign_key: true

      t.timestamps null: false
    end
    add_index :tracks, :user_id
  end
end
