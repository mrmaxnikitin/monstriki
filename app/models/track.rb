class Track < ActiveRecord::Base
	belongs_to :user

	def number_of_completed_stages
  	num = 0
  	if self.status_stage1
  		num+=1
  	end
  	if self.status_stage2
  		num+=1
  	end
  	if self.status_stage3
  		num+=1
  	end
  	if self.status_stage4
  		num+=1
  	end
  	if self.status_stage5
  		num+=1
  	end
  	if self.status_stage6
  		num+=1
  	end
  	if self.status_stage7
  		num+=1
  	end
  	if self.status_stage8
  		num+=1
  	end
  	return num
  end

  def next_quest
    self.current_quest += 1
    self.status_stage1 = 0
    self.status_stage2 = 0
    self.status_stage3 = 0
    self.status_stage4 = 0
    self.status_stage5 = 0
    self.status_stage6 = 0
    self.status_stage7 = 0
    self.status_stage8 = 0
    save!
  end
end
