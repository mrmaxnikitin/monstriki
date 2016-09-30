class Track < ActiveRecord::Base
	belongs_to :user
  def finish_trip
    self.complete_quest = true
    save!
  end
  def next_quest
    next_quest_id = Quest.where("id > :current_quest", {current_quest: self.current_quest}).minimum("id")
    unless next_quest_id
      next_quest_id = Quest.maximum("id")
    end

    self.current_quest = next_quest_id
    self.complete_quest = false
    self.answers = nil
    save!
  end
end
