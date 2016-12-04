class Track < ActiveRecord::Base
	belongs_to :user
  def finish_trip
    self.complete_quest = true
    save!
  end
  def next_quest

    if Quest.find(self.current_quest).checkpoint
      next_tour_id = Tour.where("id > :current_tour", {current_tour: self.current_tour}).minimum("id")
      unless next_tour_id
        next_tour_id = Tour.maximum("id") + 1
      end
      self.current_tour = next_tour_id
    end

    if Quest.find(self.current_quest).final
      next_location_id = Location.where("id > :current_location", {current_location: self.current_location}).minimum("id")
      unless next_location_id
        next_location_id = Location.maximum("id") + 1
      end
      self.current_location = next_location_id
    end

    next_quest_id = Quest.where("id > :current_quest", {current_quest: self.current_quest}).minimum("id")
    unless next_quest_id
      next_quest_id = Quest.maximum("id") + 1
    end
    self.current_quest = next_quest_id

    self.complete_quest = false
    self.answers = nil
    save!
  end
end
