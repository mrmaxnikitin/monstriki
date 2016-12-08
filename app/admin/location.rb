ActiveAdmin.register Location do
permit_params :name, :tours
actions :index, :show
menu label: 'Локации'

filter :id

index do
  id_column
  column :name, label: "Название"
  column :tours, label: "Туры"
  actions
end

show do
  attributes_table do
    row :id
    row :name
    row :tours
  end
  active_admin_comments
end

end
