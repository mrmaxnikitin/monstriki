class HonorsController < ApplicationController
  before_action :find_user, except: [:activate_diploma, :get_activate_diploma]
  before_filter :require_login
  before_action :require_admin, only: [:activate_diploma, :get_activate_diploma]

	def show
		@user = User.find(params[:user_id])
	end

	def update
		if @honor.update_attributes honor_params
      flash[:success] = 'Данные успешно cохранены, теперь можете купить диплом!'
    else
      flash[:error] = "Хммм... Что-то пошло не так!"
    end
    redirect_to user_honor_path(current_user.id, @honor.id)
	end

  def activate_diploma
    @honor = Honor.new
  end
  def get_activate_diploma
    @honor = Honor.find(params[:honor][:id])
    if @honor.update(paid: true)
      flash[:success] = 'Отлично!'
    else
      flash[:error] = "Провал"
    end
    redirect_to activate_diploma_path
  end

	private
    def honor_params
      params.require(:honor).permit(:name, :age, :school, :curator)
    end

    def find_user
      @honor = Honor.find(params[:id])
    end
end
