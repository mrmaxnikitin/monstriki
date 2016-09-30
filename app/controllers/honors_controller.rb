class HonorsController < ApplicationController
	before_action :find_user

	def show
		@user = User.find(params[:user_id])
	end

	def update
		if @honor.update_attributes honor_params
      flash[:success] = 'Данные успешно cохранены'
    else
      flash[:error] = "Хммм... Что-то пошло не так!"
    end
    redirect_to user_honor_path(current_user.id, @honor.id)
	end

	private
    def honor_params
      params.require(:honor).permit(:name, :age, :school, :curator)
    end

    def find_user
      @honor = Honor.find(params[:id])
    end
end
