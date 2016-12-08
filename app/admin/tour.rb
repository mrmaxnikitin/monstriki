ActiveAdmin.register Tour do
permit_params :name, :quests
actions :index, :show
menu label: 'Туры'

filter :id

index do
  id_column
  column :name, label: "Название"
  column :quests, label: "Квесты"
  actions
end

show do
  attributes_table do
    row :id
    row :name
    row :quests
  end
  active_admin_comments
end

end
