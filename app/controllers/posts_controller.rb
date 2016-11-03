class PostsController < ApplicationController
	before_action :require_admin, except: [:index]

	def index
		@posts = Post.order(created_at: "DESC").all
	end

	def new
		@post = Post.new
	end

	def create
		@post = Post.new post_params
    if @post.save
      flash[:success] = "Пост опубликован"
      redirect_to posts_path
    else
      flash[:error] = "Ошибка"
      redirect_to new_post_path
    end
	end

	private
		def post_params
      params.require(:post).permit(:title, :img, :text)
    end
end
