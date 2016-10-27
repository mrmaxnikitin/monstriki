class UserThingsController < ApplicationController
  before_filter :require_login
  before_action :find_user, only: [:index]
	def index
    @user_things = @user.user_things.all
	end

	def create
    @thing = Thing.find(params[:user_thing][:thing_id])
    current_user.buy_thing!(@thing)
    flash[:success] = "Супер! Теперь это твоё" 
    respond_to do |format|
      if @thing.thing_type == 1
        format.html { redirect_to bubuki_things_path }
      elsif @thing.thing_type == 2
        format.html { redirect_to stuff_things_path }
      end 
		  format.js
		end
  end

  def get_things
  	@things = current_user.user_things.joins(:thing).where('things.thing_type = 1').order(:thing_id).all
  	render :index, formats: :json
  end

  def active_thing
  	current_user.user_things.update_all(active: false)
  	@user_thing = UserThing.find(params[:id]).update(active: true)
		render nothing: true
  end
end
private
  def find_user
    @user = User.find(params[:user_id])
  end