class PasswordResetsController < ApplicationController
  before_filter :require_login, only: :change
  before_action :require_admin, only: [:admin_edit_pass, :admin_change_pass]

  def change
    @user = current_user
    if @user.valid_password?(params[:user][:current_password])
      @user.generate_reset_password_token!
      @user.password_confirmation = params[:user][:password_confirmation]
      if params[:user][:password] == params[:user][:password_confirmation] && @user.change_password!(params[:user][:password])
        redirect_to(user_path(@user), :success => 'Пароль успешно изменен')
      else
        flash[:error] = 'Пароли не совпадают'
        redirect_to edit_user_path(@user)
      end
    else
      flash[:error] = 'Вы ввели неверный текущий пароль'
      redirect_to edit_user_path(@user)
    end
  end

  def create
    @user = User.find_by_email(user_email)
    if @user
      @user.deliver_reset_password_instructions!
      redirect_to(root_path, :notice => 'Дальнейшие инструкции высланы на указанную почту')
    else
      flash[:error] = 'Пользователь с такой электронной почтой не зарегистрирован'
      redirect_to root_path
    end
  end

  def edit
    @token = params[:id]
    @user = User.load_from_reset_password_token(params[:id])

    if @user.blank?
      not_authenticated
      return
    end
  end

  def update
    @token = params[:id]
    @user = User.load_from_reset_password_token(params[:id])

    if @user.blank?
      not_authenticated
      return
    end

    @user.password_confirmation = params[:user][:password_confirmation]
    if @user.change_password!(params[:user][:password])
      redirect_to(root_path, :notice => 'Пароль успешно изменен')
    else
      render :action => "edit"
    end
  end

  def admin_edit_pass
  end

  def admin_change_pass
    puts "**********************************"
    puts params[:user][:email]
    puts "**********************************"
    if @user = User.find_by_email(params[:user][:email])
      @user.change_password!("mi-vas-lubim")
      flash[:success] = 'Успешно'
      redirect_to admin_edit_pass_password_resets_path
    else
      flash[:error] = 'Потрачено'
      redirect_to admin_edit_pass_password_resets_path
    end

  end

  private
    def user_email
      params[:user][:email].to_s.downcase.squish
    end
end
