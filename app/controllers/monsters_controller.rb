class MonstersController < ApplicationController
	before_action :require_admin, only: [:new, :create]
	def index
		@monsters = Monster.all
	end

	def new
		@monster = Monster.new
	end

	def create
		@monster = Monster.new monster_params
		@monster.save
		render 'new'
	end

	private
		def monster_params
			params.require(:monster).permit(:name, :img, :price)
		end

		def find_monster
      @user = Monster.find(params[:id])
    end
end
