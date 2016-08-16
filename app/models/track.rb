class Track < ActiveRecord::Base
	belongs_to :user
  def finish_quest
    user = current_user
    user.score += 10
    user.save
    self.complete_quest = true
    save!
  end
  def next_quest
    next_quest_id = Quest.where("id > :current_quest", {current_quest: self.current_quest}).minimum("id")
    self.current_quest = next_quest_id
    self.complete_quest = false
    save!
  end
end
