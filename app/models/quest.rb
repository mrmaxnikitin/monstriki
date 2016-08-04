class Quest < ActiveRecord::Base
	
	def generate_quest
		direction_number1 = rand(2)
		direction = if direction_number1 == 0
			'logic'
		elsif direction_number1 == 1
			'memory'
		end

		
		tasks_3_age = Task.where(age: 3, direction: direction).limit(3)
		tasks_4_age = Task.where(age: 4, direction: direction).limit(3)
		tasks_5_age = Task.where(age: 5, direction: direction).limit(3)
		tasks_6_age = Task.where(age: 6, direction: direction).limit(3)
		tasks_7_age = Task.where(age: 7, direction: direction).limit(3)
		a = Array.new
		tasks_3_age.each do |t|
			a << t.id.to_i
		end
		tasks_4_age.each do |t|
			a << t.id.to_i
		end
		tasks_5_age.each do |t|
			a << t.id.to_i
		end
		tasks_6_age.each do |t|
			a << t.id.to_i
		end
		tasks_7_age.each do |t|
			a << t.id.to_i
		end

		self.stage1 = a

		direction_number2 = rand(2)
		while direction_number1 == direction_number2
			direction_number2 = rand(2)
		end
		direction = if direction_number2 == 0
			'logic'
		elsif direction_number2 == 1
			'memory'
		end
		tasks_3_age = Task.where(age: 3, direction: direction).limit(3)
		tasks_4_age = Task.where(age: 4, direction: direction).limit(3)
		tasks_5_age = Task.where(age: 5, direction: direction).limit(3)
		tasks_6_age = Task.where(age: 6, direction: direction).limit(3)
		tasks_7_age = Task.where(age: 7, direction: direction).limit(3)
		a = Array.new
		tasks_3_age.each do |t|
			a << t.id.to_i
		end
		tasks_4_age.each do |t|
			a << t.id.to_i
		end
		tasks_5_age.each do |t|
			a << t.id.to_i
		end
		tasks_6_age.each do |t|
			a << t.id.to_i
		end
		tasks_7_age.each do |t|
			a << t.id.to_i
		end

		self.stage2 = a
		
		save!
  end

  def number_of_stages
  	num = 0
  	if self.stage1
  		num+=1
  	end
  	if self.stage2
  		num+=1
  	end
  	if self.stage3
  		num+=1
  	end
  	if self.stage4
  		num+=1
  	end
  	if self.stage5
  		num+=1
  	end
  	if self.stage6
  		num+=1
  	end
  	if self.stage7
  		num+=1
  	end
  	if self.stage8
  		num+=1
  	end
  	return num
  end

end