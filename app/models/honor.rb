class Honor < ActiveRecord::Base
	belongs_to :user

	validates :user_id, presence: true
  validates :quest_id, presence: true
end
