class AddCheckpointToQuests < ActiveRecord::Migration
  def change
  	add_column :quests, :checkpoint, :boolean, default: false
  end
end
