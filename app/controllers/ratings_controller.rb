class RatingsController < ApplicationController
	def index
		@riches = User.order(score: "DESC").all.limit(10)
		@new_users = User.all.order(created_at: "DESC").limit(10)
		@user_tracks = Track.order(current_quest: "DESC").all.limit(10)
	end
end
