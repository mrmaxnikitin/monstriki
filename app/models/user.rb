class User < ActiveRecord::Base
  authenticates_with_sorcery!
  acts_as_voter

  has_one  :track   
  has_many :user_things, foreign_key: "user_id", dependent: :destroy

  before_save { self.email = email.downcase }

  #validates :name,  presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, format: { message: '', with: VALID_EMAIL_REGEX, },
                    uniqueness: true
  validates :password,
    length:       { message: 'Не менее 6 символов', minimum: 6 },
    presence:     { message: 'Не может быть пустым' },
    confirmation: { message: 'Пароли не совпадают' },
    on:           :create

  validates :password,
    confirmation: { message: 'Пароли не совпадают' },
    on:           :update

  def buy_thing!(thing)
    user_things.create!(thing_id: thing.id)
  end

  def thing?(thing)
    user_things.find_by(thing_id: thing.id)
  end
end
