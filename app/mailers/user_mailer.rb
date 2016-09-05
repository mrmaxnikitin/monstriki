class UserMailer < ApplicationMailer
  def welcome(user)
    @user = user
    mail(to: 'ais-berg@mail.ru', from: 'monstriki.labs@yandex.ru', subject: 'Успешная регистрация')
  end

  def reset_password_email(user)
    @user = User.find user.id
    @url  = edit_password_reset_url(@user.reset_password_token)
    mail(to: user.email, from: 'monstriki.labs@yandex.ru', subject: 'Восстановление пароля')
  end
end
