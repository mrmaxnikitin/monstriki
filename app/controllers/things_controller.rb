class ThingsController < ApplicationController
	before_action :require_admin, only: [:new, :create]
	def index
		@things = Thing.order(created_at: "DESC").all
	end

	def new
		@thing = Thing.new
	end

	def create
		@thing = Thing.new thing_params
		@thing.save
		render 'new'
	end

	private
		def thing_params
			params.require(:thing).permit(:name, :img, :price)
		end

		def find_thing
      @user = Thing.find(params[:id])
    end
end
