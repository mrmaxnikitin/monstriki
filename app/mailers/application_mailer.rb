class ApplicationMailer < ActionMailer::Base
  default from: "monstriki.labs@yandex.ru"
  layout 'mailer'

  def default_url_options
    if Rails.env.production?
      { :host => "monstriki.com" }
    else
      { :host => "localhost:3000" }
    end
  end
end
