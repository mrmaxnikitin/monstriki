class HonorsController < ApplicationController
  before_action :find_honor, except: [:activate_diploma, :get_activate_diploma]
  before_filter :require_login
  before_action :require_admin, only: [:activate_diploma, :get_activate_diploma]

  def show
    @user = User.find(params[:user_id])

    if @honor.paid
      case @honor.quest_id
      when 3
         @output_diploma = @honor.diploma_number1(@honor.quest_id, 815)
      when 6
         @output_diploma = @honor.diploma_number1(@honor.quest_id, 920)
      when 8
         @output_diploma = @honor.diploma_number1(@honor.quest_id, 800)
      when 11
         @output_diploma = @honor.diploma_number1(@honor.quest_id, 815)
      when 14
         @output_diploma = @honor.diploma_number1(@honor.quest_id, 620)
      when 17
         @output_diploma = @honor.diploma_number1(@honor.quest_id, 650)
      when 19
         @output_diploma = @honor.diploma_number1(@honor.quest_id, 660)
      when 21
         @output_diploma = @honor.diploma_number1(@honor.quest_id, 630)
      when 24
         @output_diploma = @honor.diploma_number1(@honor.quest_id, 600)
      when 27
         @output_diploma = @honor.diploma_number1(@honor.quest_id, 650)
      when 30
         @output_diploma = @honor.diploma_number1(@honor.quest_id, 500)
      when 33
         @output_diploma = @honor.diploma_number1(@honor.quest_id, 920)
      when 36
         @output_diploma = @honor.diploma_number1(@honor.quest_id, 800)
      when 38
         @output_diploma = @honor.diploma_number1(@honor.quest_id, 920)
      when 41
         @output_diploma = @honor.diploma_number1(@honor.quest_id, 815)
      when 44
         @output_diploma = @honor.diploma_number1(@honor.quest_id, 920)
      when 47
         @output_diploma = @honor.diploma_number1(@honor.quest_id, 920)
      when 50
         @output_diploma = @honor.diploma_number1(@honor.quest_id, 920)
      when 53
         @output_diploma = @honor.diploma_number1(@honor.quest_id, 920)
      when 56
         @output_diploma = @honor.diploma_number1(@honor.quest_id, 800)
      end
    end
  end

  def update
    if @honor.update_attributes honor_params
      flash[:success] = 'Поздравляем с получением диплома!'
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

    def find_honor
      @honor = Honor.find(params[:id])
    end
end
