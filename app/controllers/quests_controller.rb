class QuestsController < ApplicationController
	before_action :find_user_quest, except: [:new, :create]
	before_action :quest_action, only: [:index, :tour]
	#before_action :find_quest, only: [:edit, :update]
	before_filter :require_login, except: [:index]
	before_action :require_admin, only: [:new, :create, :add_task_to_quest, :get_add_task_to_quest, :background, :get_background]
	include ApplicationHelper
	include UsersHelper
	def index
		if logged_in?
			@users_same_tour_amount = Track.where("current_location = ?", @track.current_location).order("RANDOM()").all.count - 1
			@users_same_tour = Track.where("current_location = ?", @track.current_location).order("RANDOM()").limit(10)
		end
	end

	def tour
		if logged_in?
			@users_same_location_amount = Track.where("current_location = ?", @track.current_location).order("RANDOM()").all.count - 1
			@users_same_location = Track.where("current_location = ?", @track.current_location).order("RANDOM()").limit(10)
		end
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

	#def finish_trip
	#	current_user.score = params[:score]
	#	current_user.save
	#	if @quest.checkpoint && !@track.complete_quest && !current_user.honors.find_by_quest_id(current_user.track.current_quest)
	#		current_user.honors.create(quest_id: current_user.track.current_quest, 
	#															 degree: params[:degree],
	#															 price: params[:price],
	#															 honor_type: 1,
	#															 name: current_user.name,
	#															 age: current_user.age)
	#	end
	#	@track.finish_trip
	#	if !@quest.checkpoint
	#		@track.next_quest
	#	end
	#	@track.save
	#	render nothing: true

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
    def quest_action
    	if logged_in? && (Time.new.utc.midnight - @track.updated_at.utc.midnight) >= 1.day && @track.complete_quest && @quest.checkpoint && @track.current_quest <= Quest.last.id
				@track.next_quest
				@track.save
			end
			if logged_in?
				if @track.current_tour <= Tour.last.id
					@quests = Quest.where(id: Tour.find(@track.current_tour).quests).order(:id).all
				else
					@quests = Quest.where(id: nil).order(:id).all
				end

				#предыдущие квесты
				if @track.complete_quest && @quest.checkpoint
					@prev_quests = Quest.where("id < ?", @track.current_quest).order("RANDOM()").limit(4)
				else
					@prev_quests = Quest.where("id < ?", @track.current_quest).order("RANDOM()").limit(5)
				end
			end
			#переход к следующему квесту
			if logged_in?
				answers = @track.answers
				unanswered = 0
				if @track.answers != nil
					if @quest.checkpoint
						for i in 0..answers.size-1
							unanswered = 1 if answers[i] == '0'
						end
					else
						for i in 0..answers.size-1
							unanswered = 1 if answers[i] == '0' || answers[i] == '2'
						end
					end
				end
				if @track.answers != nil && unanswered == 0
					if !@track.complete_quest
						current_user.score += 10
	    			current_user.save
	    		end
					if @quest.checkpoint && !@track.complete_quest && !current_user.honors.find_by_quest_id(current_user.track.current_quest)
						
						if @quest.final
							degree = 0
							degree_indicator = 0
							for i in 0..answers.size-1
				        if answers[i] == '2'
				          degree_indicator += 1
				        end
				      end

				      if degree_indicator == 0 || degree_indicator == 1
				      	degree = 1
				      elsif degree_indicator == 2 || degree_indicator == 3
				      	degree = 2
				      elsif degree_indicator == 4
				      	degree = 3
				      elsif
				      	degree = 0
				      end
				      	
				      	
							current_user.honors.create(location_id: current_user.track.current_location,
																				 quest_id: current_user.track.current_quest, 
																				 degree: degree,
																				 price: 100,
																				 honor_type: 1,
																				 name: current_user.name,
																				 age: current_user.age)
						end
					end
					@track.finish_trip
					if !@quest.checkpoint
						@track.next_quest
					end
					@track.save
				end
			end
    end
    #def quest_params
      #params.require(:quest).permit(age3: [], age4: [], age5: [], age6: [], age7: [], age8: [], age9: [], age10: [])
      #params.require(:quest).permit(:age3, :age4, :age5, :age6, :age7, :age8, :age9, :age10)
    #end
end


