class CreateQuests < ActiveRecord::Migration
  def change
    create_table :quests do |t|
      t.text    :stage1, array: true
      t.text    :stage2, array: true
      t.text    :stage3, array: true
      t.text    :stage4, array: true
      t.text    :stage5, array: true
      t.text    :stage6, array: true
      t.text    :stage7, array: true
      t.text    :stage8, array: true
      t.timestamps null: false
    end
  end
end
