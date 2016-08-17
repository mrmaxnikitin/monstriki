class QuestsController < ApplicationController
	before_action :find_quest, except: [:new, :create]
	include ApplicationHelper
	def index
		if (Time.new.utc.midnight - @track.updated_at.utc.midnight) >= 1.day
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

	def finish_trip
		current_user.score += 10
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
			task_ids_str = Quest.find(current_user.track.current_quest).age5
		elsif current_user.age == 6
			task_ids_str = Quest.find(current_user.track.current_quest).age6
		elsif current_user.age == 7
			task_ids_str = Quest.find(current_user.track.current_quest).age7
		elsif current_user.age == 8
			task_ids_str = Quest.find(current_user.track.current_quest).age8
		end
		task_ids = make_array(task_ids_str)
		@tasks = Task.where(id: task_ids).all
		render 'tasks/index', formats: :json
	end


	private
    def find_quest
      @track = current_user.track
			@quest = Quest.find(@track.current_quest)
    end
end


