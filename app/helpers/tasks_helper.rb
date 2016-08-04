module TasksHelper
	def task_direction(task)
		if task.direction == "logic"
			return "Логика"
		elsif task.direction == "memory"
			return "Память"
		end
	end
end
