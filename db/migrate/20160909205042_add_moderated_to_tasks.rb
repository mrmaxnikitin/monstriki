class AddModeratedToTasks < ActiveRecord::Migration
  def change
  	add_column :tasks, :moderated, :boolean, default: false
  end
end
