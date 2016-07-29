class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :direction		#направление (логика, воображение и т.д.)
      t.integer :task_type				#тип вопроса
      t.integer :age				#3 года, 4 года, 5 лет, 6 лет, 7 лет, 8 лет
      t.string :text				#текст вопроса
      t.string :pic1
      t.string :pic2
      t.string :pic3
      t.string :pic4
      t.string :pic5
      t.string :pic6
      t.string :pic7
      t.string :pic8
      t.string :answer

      t.timestamps null: false
    end
  end
end
