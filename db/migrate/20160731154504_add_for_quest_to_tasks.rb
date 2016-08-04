class AddForQuestToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :for_quest, :boolean
  end
end
