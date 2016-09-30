class UserThingsController < ApplicationController
  before_filter :require_login
  before_action :find_user, only: [:index]
	def index
    @user_things = @user.user_things.all
	end

	def create
    @thing = Thing.find(params[:user_thing][:thing_id])
    current_user.buy_thing!(@thing)
    respond_to do |format|
		  format.html { redirect_to things_path }
		  format.js
		end
  end

  def get_things
  	@things = current_user.user_things.joins(:thing).order(:thing_id).all
    puts @things.first.thing_id
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