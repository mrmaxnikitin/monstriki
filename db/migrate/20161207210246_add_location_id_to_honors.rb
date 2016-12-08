class AddLocationIdToHonors < ActiveRecord::Migration
  def change
  	add_reference :honors, :location, index: true
  end
end
