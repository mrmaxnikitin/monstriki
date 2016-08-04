class ThingsController < ApplicationController
	def index
		@things = Thing.all
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
