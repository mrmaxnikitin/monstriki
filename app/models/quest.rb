class Quest < ActiveRecord::Base

	def generate_quest
  	directions = ['Логика', 'Память и внимание', 'Речь', 'Математика', 'Мир вокруг нас']
  	#self.age3 = []
		#self.age4 = []
		#self.age5 = []
		#self.age6 = []
		#self.age7 = []
		#self.age8 = []
		#self.age9 = []
		#self.age10 = []
  	for age in 3..10 do
  		a = Array.new
  		for i in 0..4 do
				task = Task.where(age: age, direction: directions[i], in_quest: false, moderated: true).first
				if task
					a << task.id.to_i
					task.update(in_quest: true)
				end
  		end
  		if age == 3
				self.age3 = a
			elsif age == 4
				self.age4 = a
			elsif age == 5
				self.age5 = a
			elsif age == 6
				self.age6 = a
			elsif age == 7
				self.age7 = a
			elsif age == 8
				self.age8 = a
			elsif age == 9
				self.age9 = a
			elsif age == 10
				self.age10 = a
			end
  	end
  	save!
  end

  def push_task(age, task_id)
  	Task.find(task_id).update(in_quest: true)
  	case age
		when "age3"
		   self.age3.push(task_id)
		when "age4"
		   self.age4.push(task_id)
		when "age5"
		   self.age5.push(task_id)
		when "age6"
		   self.age6.push(task_id)
		when "age7"
		   self.age7.push(task_id)
		when "age8"
		   self.age8.push(task_id)
		when "age9"
		   self.age9.push(task_id)
		when "age10"
		   self.age10.push(task_id)
		end
		save!
  end

  def set_background(url, posx, posy)
  	self.update(background: url, posx_background: posx, posy_background: posy)
  	save!
  end

end