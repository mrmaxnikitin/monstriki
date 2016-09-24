class StaticPagesController < ApplicationController
	def welcome
		#@user = User.find_by_email('ais-berg@mail.ru')
		#puts "dlkjsdlkfjksldfjlksdjfklsdhflksdhflksjhfkjshdfkjsdf"
		#puts @user
		#puts "dlkjsdlkfjksldfjlksdjfklsdhflksdhflksjhfkjshdfkjsdf"
		#UserMailer.welcome(@user).deliver_now
		@monsters = Monster.order('RANDOM()').limit(6)
	end

	def show
	end

	def parents
	end

	def about
	end

	def contacts
	end
end
