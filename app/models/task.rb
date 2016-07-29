class Task < ActiveRecord::Base
	acts_as_votable
	#has_one :task1
end
