class UsersController < InheritedResources::Base
  before_action :find_user, except: [:index, :new, :create, :monstrik, :payment, :monster_card, :prolongation, :create_prolongation, :fetch_data_admin, :update_user_data]
  before_filter :require_login, except: [:show, :new, :create, :payment]
  before_action :require_current_user, only: [:edit, :update, :destroy]
  before_action :require_admin, only: [:prolongation,  :fetch_data_admin, :update_user_data]
	def index
		@users=User.all
	end

	def new
		@user = User.new
	end

  def show
    @honors = @user.honors.order("created_at DESC").all
    #@user_things = @user.user_things.all
    #UserMailer.welcome(@user).deliver
  end

	def create
    @user = User.new user_params
    if @user.save
      auto_login @user
      @user.update(score: 3, payment_end_date: Time.now)
      Track.create(user_id: @user.id)
      UserMonster.create(user_id: @user.id, monster_id: false, name: "")
      flash[:success] = "Супер! А теперь выберите своего монстрика"
      redirect_to monster_avatar_user_monsters_path
    else
      flash[:error] = "Хммм... Попробуйте еще раз!"
      render 'new'
    end
  end

	def edit
	end

  def fetch_data_admin
    @tracks_m3 = Track.where("current_quest <= 3").where("updated_at < ?", 1.day.ago).all
    @tracks_b3 = Track.where("current_quest > 3").where("updated_at < ?", 1.day.ago).all
  end

  def update_user_data
  end
	
	def update
		if @user.update_attributes user_params
      flash[:success] = 'Данные успешно изменены'
      redirect_to edit_user_path(current_user)
    else
      render 'edit'
    end
	end

	def destroy
	end

  def monstrik
  end

  def payment
  end

  def monster_card
    @number_of_IG = Quest.where(checkpoint: true).all.count
  end

  def prolongation
  end

  def bubuki
    @user_things = @user.user_things.joins(:thing).where('things.thing_type = 1').all
  end
  def stuff
    @user_things = @user.user_things.joins(:thing).where('things.thing_type = 2').order("created_at DESC").all
  end

  def create_prolongation
    @user = User.find(params[:user][:id])
    @user.payment_end_date += params[:user][:payment_end_date].to_i.months
    @user.save
    redirect_to prolongation_path
  end

  private
    def user_params
      params.require(:user).permit(:email, :name, :age, :goal, :password, :password_confirmation, :terms_of_service)
    end

    def find_user
      @user = User.find(params[:id])
    end

    def require_current_user
      redirect_to user_path(@user) unless current_user == @user
    end
end

