class Thing < ActiveRecord::Base
	has_many :user_things, foreign_key: "thing_id", dependent: :destroy
end
