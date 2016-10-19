class AddTourNameToQuests < ActiveRecord::Migration
  def change
  	add_column :quests, :tour_name, :string
  	add_column :quests, :task_text_color, :string, default: "#ffffff"
  end
end
