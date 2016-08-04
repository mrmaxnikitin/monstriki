class QuestsController < ApplicationController
	before_action :find_quest, except: [:new, :create]
	include ApplicationHelper
	def index
		@track = current_user.track
		@quest = Quest.find(@track.current_quest)
	end

	def new
		@quest = Quest.new
	end

	def create
		@quest = Quest.new
		@quest.generate_quest
		render 'new'
	end

	def complete_stage
		@status_stage = current_user.track
		if params[:stage] == '1'
			@status_stage.status_stage1 = true
		elsif params[:stage] == '2'
			@status_stage.status_stage2 = true
		elsif params[:stage] == '3'
			@status_stage.status_stage3 = true
		elsif params[:stage] == '4'
			@status_stage.status_stage4 = true
		end
		@status_stage.save
		render nothing: true
	end

	def complete_quest
		@track.next_quest
		@track.save
		redirect_to quests_path
	end

	def stage1
		@task = Task.find(@quest.stage1[1])
	end
	def get_stage1
		task_ids_str = Quest.find(current_user.track.current_quest).stage1
		task_ids = make_array(task_ids_str)

		@tasks = Task.where(id: task_ids).all
		render 'tasks/index', formats: :json
	end

	def stage2
		@task = Task.find(@quest.stage1[1])
	end
	def get_stage2
		task_ids_str = Quest.find(current_user.track.current_quest).stage2
		task_ids = make_array(task_ids_str)

		@tasks = Task.where(id: task_ids).all
		render 'tasks/index', formats: :json
	end

	def stage3
		@task = Task.find(@quest.stage1[1])
	end
	def get_stage3
		task_ids_str = Quest.find(current_user.track.current_quest).stage3
		task_ids = make_array(task_ids_str)

		@tasks = Task.where(id: task_ids).all
		render 'tasks/index', formats: :json
	end

	def stage4
		@task = Task.find(@quest.stage1[1])
	end
	def get_stage4
		task_ids_str = Quest.find(current_user.track.current_quest).stage4
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