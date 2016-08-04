class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
    	t.integer 	 :current_quest, default: 1
    	t.boolean 	 :status_stage1, default: false
    	t.boolean 	 :status_stage2, default: false
    	t.boolean 	 :status_stage3, default: false
    	t.boolean 	 :status_stage4, default: false
    	t.boolean 	 :status_stage5, default: false
    	t.boolean 	 :status_stage6, default: false
    	t.boolean 	 :status_stage7, default: false
    	t.boolean 	 :status_stage8, default: false
    	t.references :user, foreign_key: true

      t.timestamps null: false
    end
    add_index :tracks, :user_id
  end
end
