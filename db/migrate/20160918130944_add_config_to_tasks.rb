class AddConfigToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :config, :string
  end
end
