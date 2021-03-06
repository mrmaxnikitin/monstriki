class RatingsController < ApplicationController
	def index
		@riches = User.order(score: "DESC").all.limit(20)
		@new_users = User.all.order(created_at: "DESC").limit(10)
		@user_tracks = Track.order(current_tour: "DESC").all.limit(20)
	end
end
