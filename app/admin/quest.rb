ActiveAdmin.register Quest do
permit_params :age3, :age4, :age5, :age6, :age7, :age8, :age9, :age10
actions :index, :show, :destroy, :edit, :update, :new, :create
menu label: 'Квесты'

filter :id

index do
  id_column
  column :age4, label: "4 года"
  column :age5, label: "5 лет"
  column :age6, label: "6 лет"
  column :age7, label: "7 лет"
  actions
end

show do
  attributes_table do
    row :id
    row :age3
    row :age4
    row :age5
    row :age6
    row :age7
    row :age8
    row :age9
    row :age10
  end
  active_admin_comments
end

end
