class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :direction		#направление (логика, воображение и т.д.)
      t.integer :task_type				#тип вопроса
      t.integer :subtype
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
      t.string :pic9
      t.string :pic10
      t.string :pic11
      t.string :pic12
      t.string :answer
      t.boolean :in_quest,    default: false   #принадлежность вопроса какому-нибудь квесту
      t.boolean :only_quest,  default: false   #вопрос только для только для квеста, его нет в тренировках
      t.boolean :sample,      default: false   #вопрос для тех, кто не оплатил

      t.timestamps null: false
    end
  end
end
