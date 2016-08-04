class UserThingsController < ApplicationController
	def index
	end

	def create
		puts '%%%%%%%%%%%%%%'
		params[:user_thing][:thing_id]
		puts '%%%%%%%%%%%%%%!'
    @thing = Thing.find(params[:user_thing][:thing_id])
    current_user.buy_thing!(@thing)
    respond_to do |format|
		  format.html { redirect_to things_path }
		  format.js
		end
  end
end
