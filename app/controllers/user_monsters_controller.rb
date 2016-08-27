class UserMonstersController < ApplicationController
	before_filter :require_login
  def buy_monster
		current_user.buy_monster!(params[:monster_id])
		redirect_to monstrik_path
  end

  def rename_monster
		current_user.user_monster.name = params[:user_monster][:name]
		current_user.user_monster.save
		redirect_to monstrik_path
  end
end
