ActiveAdmin.register User do
permit_params :email, :name, :age, :score, :goal, :admin, :payment_end_date
actions :index, :show, :edit, :update
menu label: 'Пользователи'

filter :id
filter :email, label: "Эл. почта"
filter :name, label: "Имя"
filter :age, label: "Возраст"
filter :goal, label: "Цель"

index do
  id_column
  column :email, label: "Эл. почта"
  column :name, label: "Имя"
  column :age, label: "Возраст"
  column :score, label: "Монетки"
  column :goal, label: "Цель"
  column :admin, label: "Админ"
  column :payment_end_date, label: "Карта монстрика"
  actions
end

show do
  attributes_table do
    row :id
    row :email
    row :name
    row :age
    row :score
    row :goal
    row :admin
    row :payment_end_date
    row :created_at
    row :updated_at
  end
  active_admin_comments
end

end
