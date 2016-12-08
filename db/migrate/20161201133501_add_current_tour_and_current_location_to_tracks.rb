class AddCurrentTourAndCurrentLocationToTracks < ActiveRecord::Migration
  def change
  	add_column :tracks, :current_tour, :integer, default: 1
  	add_column :tracks, :current_location, :integer, default: 1
  end
end
