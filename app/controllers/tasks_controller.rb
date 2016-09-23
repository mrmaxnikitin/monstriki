class TasksController < ApplicationController
	before_filter :require_login, except: [:index, :test, :get_test, :logic, :get_logic, :memory_attention, :get_memory_attention, :speech, :get_speech, :world, :get_world, :math, :get_math]
	before_action :require_admin, only: [:new, :create, :documentation]

	def index
		@tasks = Task.all
	end

	def logic
	end
	def get_logic
		if logged_in?
			@tasks = Task.where(direction: "Логика", age: [current_user.age-1, current_user.age, current_user.age+1], only_quest: false, moderated: true).order('RANDOM()').all
		else
			@tasks = Task.where(direction: "Логика", only_quest: false, moderated: true).limit(10)
		end
		render :index, formats: :json
	end

	def memory_attention
	end
	def get_memory_attention
		if logged_in?
			@tasks = Task.where(direction: "Память и внимание", age: [current_user.age-1, current_user.age, current_user.age+1], only_quest: false, moderated: true).order('RANDOM()').all
		else
			@tasks = Task.where(direction: "Память и внимание", only_quest: false, moderated: true).limit(10)
		end
		render :index, formats: :json
	end

	def speech
	end
	def get_speech
		if logged_in?
			@tasks = Task.where(direction: "Речь", age: [current_user.age-1, current_user.age, current_user.age+1], only_quest: false, moderated: true).order('RANDOM()').all
		else
			@tasks = Task.where(direction: "Речь", only_quest: false, moderated: true).limit(10)
		end
		render :index, formats: :json
	end

	def world
	end
	def get_world
		if logged_in?
			@tasks = Task.where(direction: "Мир вокруг нас", age: [current_user.age-1, current_user.age, current_user.age+1], only_quest: false, moderated: true).order('RANDOM()').all
		else
			@tasks = Task.where(direction: "Мир вокруг нас", only_quest: false, moderated: true).limit(10)
		end
		render :index, formats: :json
	end

	def math
	end
	def get_math
		if logged_in?
			@tasks = Task.where(direction: "Математика", age: [current_user.age-1, current_user.age, current_user.age+1], only_quest: false, moderated: true).order('RANDOM()').all
		else
			@tasks = Task.where(direction: "Математика", only_quest: false, moderated: true).limit(10)
		end
		render :index, formats: :json
	end

	def moderation
	end
	def get_moderation
		@tasks = Task.where(moderated: false).all
		render :index, formats: :json
	end

	def moderate
		@task = Task.find(params[:task_id])
		@task.moderated = true
		@task.save
		render nothing: true
	end

	def new
	end

	def create
    @task = Task.create task_params
    render nothing: true
	end

	def test
	end
	def get_test
		@tasks = Task.where(id: [100, 155, 251, 81, 191]).all
		render :index, formats: :json
	end

	def reward
		@user = current_user
		@user.score = params[:score]
		@user.save
		render nothing: true
	end

	def error_message
		TaskError.create(user_id: current_user.id, task_id: params[:task_id], text: params[:text])
		render nothing: true
	end

	def documentation
	end

	private
		def task_params
      params.require(:task).permit(:direction, :task_type, :subtype, :age, :text, :pic1, :pic2, :pic3, :pic4, :pic5, :pic6, :pic7, :pic8, :pic9, :pic10, :pic11, :pic12, :answer, :only_quest)
    end
    
end
