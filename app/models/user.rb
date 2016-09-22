class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  authenticates_with_sorcery!
  acts_as_voter

  has_one  :track   
  has_many :user_things, foreign_key: "user_id", dependent: :destroy
  has_one :user_monster, foreign_key: "user_id", dependent: :destroy

  before_save { self.email = email.downcase }

  #validates :name,  presence: true, length: { maximum: 50 }
  #VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: { message: 'Введите свою почту' },
                    uniqueness: { message: 'Пользователь с такой почтой уже зарегистрирован' }
  validates :password,
    presence:     { message: 'Введите пароль' },
    length:       { message: 'Пароль должен содержать минимум 6 символов', minimum: 6 },
    confirmation: { message: 'Пароли не совпадают' },
    on:           :create

  validates :age,
    presence:     { message: 'Укажите возраст ребенка' }
  validates :name,
    presence:     { message: 'Укажите имя ребенка' }
  validates :terms_of_service,
    acceptance: { message: 'Ознакомьтесь с пользовательским соглашеним и поставьте галочку'}

  def buy_thing!(thing)
    if self.score >= thing.price
      user_things.create!(thing_id: thing.id)
      self.score -= thing.price
    end
    save!
  end

  def have_thing?(thing)
    user_things.find_by(thing_id: thing.id)
  end

  def buy_monster!(monster_id)
    monster_presence = self.user_monster.monster_id
    user_monster.update!(monster_id: monster_id)
    if monster_presence != 0
      self.score -= 100
    end
    save!
  end

  def have_monster?(monster)
    user_monster.monster == monster
  end
  
end
