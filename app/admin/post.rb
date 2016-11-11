ActiveAdmin.register Post do
permit_params :title, :img, :text
actions :index, :show, :destroy, :edit, :update, :new, :create
menu label: 'Посты'

filter :id

index do
  id_column
  column :title, label: "Заголовок"
  column :text, label: "Текст"
  column :img, label: "Изображение"
  actions
end

show do
  attributes_table do
    row :id
    row :title
    row :text
    row (:img) { |t| image_tag(t.img.to_s) }
  end
  active_admin_comments
end

end
