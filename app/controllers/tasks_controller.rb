class TasksController < ApplicationController
	before_filter :require_login, except: :index
	before_action :require_admin, only: [:new, :create]

	def index
		@tasks = Task.all
	end

	def logic
	end
	def get_logic
		@tasks = Task.where(direction: "Логика").order('RANDOM()').all
		render :index, formats: :json
	end

	def memory
	end
	def get_memory
		@tasks = Task.where(direction: "Память").order('RANDOM()').all
		render :index, formats: :json
	end

	def new
	end

	def create
    @task = Task.create task_params
    render nothing: true
	end

	def test
	end

	def reward
		@user = current_user
		@user.score = params[:score]
		@user.save
		render nothing: true
	end

	private
		def task_params
      params.require(:task).permit(:direction, :task_type, :subtype, :age, :text, :pic1, :pic2, :pic3, :pic4, :pic5, :pic6, :pic7, :pic8, :pic9, :pic10, :pic11, :pic12, :answer, :for_quest)
    end
    
end
