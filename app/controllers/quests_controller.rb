class QuestsController < ApplicationController
	before_action :find_user_quest, except: [:new, :create]
	#before_action :find_quest, only: [:edit, :update]
	before_filter :require_login, except: [:index]
	before_action :require_admin, only: [:new, :create, :add_task_to_quest, :get_add_task_to_quest]
	include ApplicationHelper
	def index
		if logged_in? && (Time.new.utc.midnight - @track.updated_at.utc.midnight) >= 1.day && @track.complete_quest
			@track.next_quest
			@track.save
		end
	end

	def new
		@quest = Quest.new
	end

	def create
		@quest = Quest.new
		@quest.generate_quest
		render 'new'
	end

	def add_task_to_quest
	end
	def get_add_task_to_quest
		@q = Quest.find(params[:quest_id])
		@q.push_task(params[:age], params[:task_id])
		render nothing: true
	end

	def finish_trip
		current_user.score = params[:score]
		current_user.save
		@track.finish_trip
		@track.save
		render nothing: true
	end

	def next_quest
		@track.next_quest
		@track.save
		redirect_to quests_path
	end

	def trip
	end

	def get_trip
		if current_user.age == 3
			task_ids_str = Quest.find(current_user.track.current_quest).age3
		elsif current_user.age == 4
			task_ids_str = Quest.find(current_user.track.current_quest).age4
		elsif current_user.age == 5
			task_ids_str = Quest.find(current_user.track.current_quest).age6   #Внимание! для пяти лет тоже берутся задания шестилетних
		elsif current_user.age == 6
			task_ids_str = Quest.find(current_user.track.current_quest).age6
		elsif current_user.age == 7
			task_ids_str = Quest.find(current_user.track.current_quest).age7
		elsif current_user.age == 8
			task_ids_str = Quest.find(current_user.track.current_quest).age8
		end
		#task_ids = make_array(task_ids_str)
		@tasks = Task.where(id: task_ids_str).all
		render 'tasks/index', formats: :json
	end


	private
    def find_user_quest
      @track = current_user.track if current_user
			@quest = Quest.find(@track.current_quest) if current_user
    end
    def find_quest
			@quest = Quest.find(params[:id])
    end
    #def quest_params
      #params.require(:quest).permit(age3: [], age4: [], age5: [], age6: [], age7: [], age8: [], age9: [], age10: [])
      #params.require(:quest).permit(:age3, :age4, :age5, :age6, :age7, :age8, :age9, :age10)
    #end
end


