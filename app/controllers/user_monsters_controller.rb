class UserMonstersController < ApplicationController
	before_filter :require_login

  def monster_avatar
    @monsters = Monster.all
  end

  def monster_name
  end

  def choose_monster
    current_user.user_monster.update!(monster_id: params[:monster_id])
    redirect_to monster_name_user_monsters_path
  end

  def give_name_to_monster
    if params[:user_monster][:name] == ""
      flash[:error] = "Придумай своему монстрику имя!"
      redirect_to monster_name_user_monsters_path
    else
      current_user.user_monster.name = params[:user_monster][:name]
      current_user.user_monster.save
      flash[:success] = "Классно! А теперь попробуй пройти свой первый квест!"
      redirect_to start_path
    end
  end

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
