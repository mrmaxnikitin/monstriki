class CreatePicAuthors < ActiveRecord::Migration
  def change
    create_table :pic_authors do |t|
      t.string :name, null: false
      t.string :link
      t.timestamps null: false
    end
  end
end
