ActiveAdmin.register TaskError do
permit_params :task_id, :user_id, :text, :completed
actions :index, :show, :edit, :update
menu label: 'Ошибки в заданиях'

filter :id
filter :task_id, label: "taks id"
filter :user_id, label: "user id"
filter :text, label: "Причина"
filter :completed, label: "Выполнено"

index do
  id_column
  column :task_id, label: "taks id"
  column :user_id, label: "user id"
  column :text, label: "Причина"
  column :completed, label: "Выполнено"
  actions
end

show do
  attributes_table do
    row :taks_id
    row :user_id
    row :text
    row :comleted
  end
  active_admin_comments
end

end
