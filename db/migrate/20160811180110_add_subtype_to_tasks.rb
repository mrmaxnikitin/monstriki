class AddSubtypeToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :subtype, :integer
  end
end
