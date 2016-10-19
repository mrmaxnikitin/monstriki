class AddBackgroundToQuests < ActiveRecord::Migration
  def change
  	add_column :quests, :background, :string, default: "/images/background1.jpg"
  	add_column :quests, :posx_background, :string, default: "0"
  	add_column :quests, :posy_background, :string, default: "0"
  end
end
