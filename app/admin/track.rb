ActiveAdmin.register Track do
permit_params :user_id, :current_quest, :complete_quest, :answers
actions :index, :show, :edit, :update
menu label: 'Треки'

filter :id
filter :user_id, label: "user id"
filter :current_quest, label: "quest id"
filter :updated_at, label: "Обновлен"
filter :complete_quest, label: "Квест выполнен?"

index do
  id_column
  column :user_id, label: "user id"
  column :current_quest, label: "Текущий квест"
  column :complete_quest, label: "Квест выполнен"
  column :answers, label: "Ответы"
  actions
end

show do
  attributes_table do
    row :user_id
    row :current_quest
    row :complete_quest
    row :answers
  end
  active_admin_comments
end

end
