class TasksController < ApplicationController

	def index
		@tasks = Task.all
	end

	def logic
	end

	def get_logic
		@tasks = Task.where(direction: "logic").order('RANDOM()').limit(1)
		puts "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%"
		puts "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%"
		render :index, formats: :json
	end

	def new
	end

	def create
    @task = Task.create task_params
    ##if params[:task][:task_type] == "1"
    	##@task1 = Task1.create(task1_params)
    	##@task.task1 = @task1
  	##end
    render nothing: true
	end

	def test
	end

	private
		def task_params
      params.require(:task).permit(:direction, :task_type, :age, :text, :pic1, :pic2, :pic3, :pic4, :pic5, :pic6, :pic7, :pic8, :answer)
    end
    #def task1_params
     # params.require(:task1).permit(
       # :pic1, :pic2, :pic3, :pic4, :pic5, :pic6, :pic7, :pic8, :answer)
    #end

    def find_task
      @task = Task.find(params[:id])
    end
end
