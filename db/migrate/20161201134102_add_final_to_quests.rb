class AddFinalToQuests < ActiveRecord::Migration
  def change
  	add_column :quests, :final, :boolean, default: false
  end
end
