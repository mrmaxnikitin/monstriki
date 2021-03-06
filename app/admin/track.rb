ActiveAdmin.register Track do
permit_params :user_id, :current_quest, :complete_quest, :answers
actions :index, :show, :edit, :update
menu label: 'Треки'

filter :id
filter :user_id, label: "user id"
filter :updated_at, label: "Обновлен"
filter :created_at, label: "Создан"
filter :current_location, label: "location id"
filter :current_tour, label: "tour id"
filter :current_quest, label: "quest id"
filter :complete_quest, label: "Квест выполнен?"

index do
  id_column
  column :user_id, label: "user id"
  column ('email') {|u| User.find(u.user_id).email}
  column :current_location, label: "Текущая локация"
  column :current_tour, label: "Текущий уровень"
  column :current_quest, label: "Текущий квест"
  column :complete_quest, label: "Квест выполнен"
  column :answers, label: "Ответы"
  actions
end

show do
  attributes_table do
    row :user_id
    row ('email') {|u| User.find(u.id).email}
    row :current_location
    row :current_tour
    row :current_quest
    row :complete_quest
    row :answers
    row :created_at
    row :updated_at
  end
  active_admin_comments
end

end
