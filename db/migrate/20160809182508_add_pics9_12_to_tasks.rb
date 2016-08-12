class AddPics912ToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :pic9, :string
    add_column :tasks, :pic10, :string
    add_column :tasks, :pic11, :string
    add_column :tasks, :pic12, :string
  end
end
