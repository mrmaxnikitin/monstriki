class TasksController < ApplicationController
	before_filter :require_login, except: :index
	before_action :require_admin, only: [:new, :create, :documentation]

	def index
		@tasks = Task.all
	end

	def logic
	end
	def get_logic
		@tasks = Task.where(direction: "Логика", age: current_user.age, only_quest: false, moderated: true).order('RANDOM()').all
		render :index, formats: :json
	end

	def memory
	end
	def get_memory
		@tasks = Task.where(direction: "Память", age: current_user.age, only_quest: false, moderated: true).order('RANDOM()').all
		render :index, formats: :json
	end

	def attention
	end
	def get_attention
		@tasks = Task.where(direction: "Внимание", age: current_user.age, only_quest: false, moderated: true).order('RANDOM()').all
		render :index, formats: :json
	end

	def world
	end
	def get_world
		@tasks = Task.where(direction: "Мир вокруг нас", age: current_user.age, only_quest: false, moderated: true).order('RANDOM()').all
		render :index, formats: :json
	end

	def math
	end
	def get_math
		@tasks = Task.where(direction: "Математика", age: current_user.age, only_quest: false, moderated: true).order('RANDOM()').all
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
