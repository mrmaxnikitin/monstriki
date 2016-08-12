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

  def get_things
  	@things = current_user.user_things.joins(:thing).all
  	render :index, formats: :json
  end

  def active_thing
  	current_user.user_things.update_all(active: false)
  	@user_thing = UserThing.find(params[:id]).update(active: true)
		render nothing: true
  end
end
