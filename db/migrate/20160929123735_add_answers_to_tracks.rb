class AddAnswersToTracks < ActiveRecord::Migration
  def change
  	add_column :tracks, :answers, :string   # 0 - ответа нет, 1 - правильно, 2 - неправильно
  end
end
