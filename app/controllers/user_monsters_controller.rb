class UserMonstersController < ApplicationController
	before_filter :require_login
  def buy_monster
		current_user.buy_monster!(params[:monster_id])
		redirect_to monstrik_path
  end

  def rename_monster
  	if params[:user_monster][:name] == ""
  		flash[:error] = "Введите имя монстрика в поле над кнопкой!"
  	else
  		current_user.user_monster.name = params[:user_monster][:name]
			current_user.user_monster.save
			flash[:success] = "Классно! Замечательное имя для монстрика!"
  	end
  	redirect_to monstrik_path
		
  end
end
