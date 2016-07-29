class UsersController < InheritedResources::Base
  before_action :find_user, except: [:index, :new, :create]
	def index
		@users=User.all
	end

	def new
		@user = User.new
	end

	def create
    @user = User.new user_params
    if @user.save
      auto_login @user
      flash[:success] = "Добро пожаловать!"
      redirect_to root_path
    else
      redirect_to parents_path
    end
  end

	def edit
	end
	
	def update
		if @user.update_attributes user_params
      flash[:success] = 'Данные успешно изменены'
      redirect_to user_path
    else
      render 'edit'
    end
	end

	def destroy
	end

  private
    def user_params
      params.require(:user).permit(:email, :name, :age, :goal, :character, :password, :password_confirmation)
    end

    def find_user
      @user = User.find(params[:id])
    end
end

