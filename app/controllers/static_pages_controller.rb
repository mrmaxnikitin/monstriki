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

	def designers
		@authors = PicAuthor.order(created_at: "DESC").all
	end

	def create_pic_author
		@autor = PicAuthor.new author_params
		if @autor.save
			flash[:success] = "Успешно добавлен!"
		else
			flash[:error] = "Такой автор уже есть!"
		end
		redirect_to designers_path
	end

	private
    def author_params
      params.require(:pic_author).permit(:name, :link)
    end
end
