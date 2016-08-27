class UserMonster < ActiveRecord::Base
	belongs_to :user
	belongs_to :monster

	validates :user_id, presence: true
  validates :monster_id, presence: true
end
