class CreateQuests < ActiveRecord::Migration
  def change
    create_table :quests do |t|
      t.text    :age3, array: true
      t.text    :age4, array: true
      t.text    :age5, array: true
      t.text    :age6, array: true
      t.text    :age7, array: true
      t.text    :age8, array: true
      t.text    :age9, array: true
      t.text    :age10, array: true
      t.timestamps null: false
    end
  end
end
