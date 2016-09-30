class QuestsController < ApplicationController
	before_action :find_user_quest, except: [:new, :create]
	#before_action :find_quest, only: [:edit, :update]
	before_filter :require_login, except: [:index]
	before_action :require_admin, only: [:new, :create, :add_task_to_quest, :get_add_task_to_quest]
	include ApplicationHelper
	def index
		if logged_in? && (Time.new.utc.midnight - @track.updated_at.utc.midnight) >= 1.day && @track.complete_quest && @quest.checkpoint
			@track.next_quest
			@track.save
		end
		@first_quest = Quest.where("checkpoint = ? AND id < ?", true, @track.current_quest).maximum("id") #first_quest_after_prev_checkpoint_quest
		@first_quest = 1 if !@first_quest 
		@checkpoint_quest = Quest.where("checkpoint = ? AND id >= ?", true, @track.current_quest).minimum("id")

		@quests = Quest.where("id >= ? AND id <= ?", @first_quest, @checkpoint_quest).all
		#puts "fsdfsdfsdfsdfsdfsdfsdfsdf"
		#puts @quests.count
		#puts "fsdfsdfsdfsdfsdfsdfsdfsdf"
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
		if @quest.checkpoint && !@track.complete_quest && !current_user.honors.find_by_quest_id(current_user.track.current_quest)
			current_user.honors.create(quest_id: current_user.track.current_quest, 
																 degree: params[:degree],
																 price: params[:price],
																 honor_type: 1,
																 name: current_user.name,
																 age: current_user.age)
		end
		@track.finish_trip
		if !@quest.checkpoint
			@track.next_quest
		end
		@track.save
		render nothing: true
	end

	#def next_quest
	#	@track.next_quest
	#	@track.save
	#	redirect_to quests_path
	#end

	def choose_trip

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

	def save_answers
		@track.answers = params[:answers]
		@track.save
		render nothing: true
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


