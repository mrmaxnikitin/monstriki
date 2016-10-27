class RemoveIndexThingsUnique < ActiveRecord::Migration
  def change
  	remove_index :user_things, [:user_id, :thing_id]
  end
end
