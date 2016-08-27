class Monster < ActiveRecord::Base
	has_many :user_monsters, foreign_key: "monster_id", dependent: :destroy
end
