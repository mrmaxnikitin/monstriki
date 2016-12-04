class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
    	t.string :name
    	t.string :img
    	t.text   :tours, array: true
      t.timestamps null: false
    end
  end
end
