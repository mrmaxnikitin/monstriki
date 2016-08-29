class Task < ActiveRecord::Base
	acts_as_votable
	has_many :task_errors, foreign_key: "task_id", dependent: :destroy
	validates :direction, presence: true
	validates :task_type, presence: true
	validates :subtype, presence: true
	validates :text, presence: true
end
