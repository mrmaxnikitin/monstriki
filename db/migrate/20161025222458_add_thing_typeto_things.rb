class AddThingTypetoThings < ActiveRecord::Migration
  def change
  	add_column :things, :thing_type, :integer #1 - бубуки, 2 - обычные вещи
  end
end
