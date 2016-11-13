class QuestsController < ApplicationController
	before_action :find_user_quest, except: [:new, :create]
	#before_action :find_quest, only: [:edit, :update]
	before_filter :require_login, except: [:index]
	before_action :require_admin, only: [:new, :create, :add_task_to_quest, :get_add_task_to_quest, :background, :get_background]
	include ApplicationHelper
	include UsersHelper
	def index
		if logged_in? && (Time.new.utc.midnight - @track.updated_at.utc.midnight) >= 1.day && @track.complete_quest && @quest.checkpoint && @track.current_quest <= Quest.last.id
			@track.next_quest
			@track.save
		end
		if logged_in?
			@first_quest = Quest.where("checkpoint = ? AND id < ?", true, @track.current_quest).maximum("id") #first_quest_after_prev_checkpoint_quest
			if !@first_quest
				@first_quest = 1
			else
				@first_quest = @first_quest.to_i + 1
			end
			@checkpoint_quest = Quest.where("checkpoint = ? AND id >= ?", true, @track.current_quest).minimum("id")

			@quests = Quest.where("id >= ? AND id <= ?", @first_quest, @checkpoint_quest).order(:id).all

			@users_same_level_amount = Track.where("current_quest >= ? AND current_quest <= ?", @first_quest, @checkpoint_quest).order("RANDOM()").all.count - 1
			@users_same_level = Track.where("current_quest >= ? AND current_quest <= ?", @first_quest, @checkpoint_quest).order("RANDOM()").limit(10)


			#предыдущие квесты
			@prev_quests = Quest.where("id < ?", @track.current_quest).order("RANDOM()").limit(6)
		end

		#puts "fsdfsdfsdfsdfsdfsdfsdfsdf"
		#puts @quests.count
		#puts "fsdfsdfsdfsdfsdfsdfsdfsdf"
	end

	def next
		if !expiry_monster_card?
			@track.next_quest
			redirect_to start_path
		end
	end

	def passed
		@prev_quests = Quest.where("id < ?", @track.current_quest).order(id: "DESC").all
	end

	def extra
		@extra_quests = Quest.order(id: "DESC").all
	end

	def new
		@quest = Quest.new
	end

	def create
		@quest = Quest.new
		@quest.generate_quest
		render 'new'
	end

	def show
		@pquest = Quest.find(params[:id])
		if current_user.age == 3
			task_ids_str = Quest.find(@pquest.id).age3
		elsif current_user.age == 4
			task_ids_str = Quest.find(@pquest.id).age6	#Внимание! для 4-х лет тоже берутся задания шестилетних
		elsif current_user.age == 5
			task_ids_str = Quest.find(@pquest.id).age6  #Внимание! для 5-и лет тоже берутся задания шестилетних
		elsif current_user.age == 6
			task_ids_str = Quest.find(@pquest.id).age7	#Внимание! для 6-и лет тоже берутся задания 7 лет
		elsif current_user.age == 7
			task_ids_str = Quest.find(@pquest.id).age7
		elsif current_user.age == 8
			task_ids_str = Quest.find(@pquest.id).age8
		end
		puts "%%%%%%%%%%%%%%%%%%%%%%%%@@@@@@@@@@@@@@@@@@@"
		@tasks = Task.where(id: task_ids_str).all
		respond_to do |f|
      f.json { render json: @tasks }
      f.html { @pquest }
    end
	end

	def extra_show
		@extra_quest = Quest.find(params[:id])
		if current_user.age == 4
			task_ids_str = Quest.find(@extra_quest.id).age7
		elsif current_user.age == 5
			task_ids_str = Quest.find(@extra_quest.id).age7 
		elsif current_user.age == 6
			task_ids_str = Quest.find(@extra_quest.id).age6	
		elsif current_user.age == 7
			task_ids_str = Quest.find(@extra_quest.id).age6
		end

		puts "&&&&&&&&&&&&&&&&&$$$$$$$$$$$$$$$$$$$$$"
		@tasks = Task.where(id: task_ids_str).all
		respond_to do |f|
      f.json { render json: @tasks }
      f.html { @pquest }
    end
	end

	def background
	end
	def get_background
		@q = Quest.find(params[:quest_id])
		@q.set_background(params[:url], params[:posx], params[:posy])
		@q.update(tour_name: params[:tour_name], task_text_color: params[:task_text_color])
		render nothing: true
	end

	def add_task_to_quest
	end
	def get_add_task_to_quest
		@q = Quest.find(params[:quest_id])
		@q.push_task(params[:age], params[:task_id]) if @q
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
			task_ids_str = Quest.find(current_user.track.current_quest).age6	#Внимание! для 4-х лет тоже берутся задания шестилетних
		elsif current_user.age == 5
			task_ids_str = Quest.find(current_user.track.current_quest).age6  #Внимание! для 5-и лет тоже берутся задания шестилетних
		elsif current_user.age == 6
			task_ids_str = Quest.find(current_user.track.current_quest).age7	#Внимание! для 6-и лет тоже берутся задания 7 лет
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
			@quest = Quest.find_by(id: @track.current_quest) if current_user
    end
    def find_quest
			@quest = Quest.find(@pquest.id)
    end
    #def quest_params
      #params.require(:quest).permit(age3: [], age4: [], age5: [], age6: [], age7: [], age8: [], age9: [], age10: [])
      #params.require(:quest).permit(:age3, :age4, :age5, :age6, :age7, :age8, :age9, :age10)
    #end
end


