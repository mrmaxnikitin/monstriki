class Quest < ActiveRecord::Base

	def generate_quest
  	directions = ['Логика', 'Память']
  	for age in 5..5 do
  		a = Array.new
  		for i in 0..1 do
				task = Task.where(age: age, direction: directions[i], for_quest: false).first
				if task
					a << task.id.to_i
					task.update(for_quest: true)
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

end