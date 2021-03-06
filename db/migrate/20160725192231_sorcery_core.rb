class SorceryCore < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string    :email,            :null => false
      t.string    :crypted_password
      t.string    :salt
      t.string    :name
      t.integer   :age
      t.integer   :score,            default: 0
      t.string    :goal
      t.boolean   :admin,            default: false
      t.datetime  :payment_end_date, default: Time.now

      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end