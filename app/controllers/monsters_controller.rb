class MonstersController < ApplicationController
	before_action :require_admin, only: [:new, :create]
	def index
		@monsters = Monster.all
	end

	private
		def monster_params
			params.require(:monster).permit(:avatar)
		end

		def find_monster
      @user = Monster.find(params[:id])
    end
end
