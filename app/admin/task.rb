ActiveAdmin.register Task do
permit_params :direction, :task_type, :subtype, :age, :text, :answer, :pic1, :pic2, :pic3, :pic4, :pic5, :pic6, :pic7, :pic8, :pic9, :pic10, :pic11, :pic12, :only_quest, :moderated
actions :index, :show, :destroy, :edit, :update, :new, :create
menu label: 'Задания'

filter :id
filter :direction, as: :select, label: "Направление"
filter :age, label: "Возраст"
filter :task_type, label: "Тип задания"
filter :subtype, label: "Подтип"

index do
  id_column
  column :direction, label: "Направление"
  column :task_type, label: "Тип"
  column :age, label: "Возраст"
  column :text, label: "Текст"
  column :subtype, label: "Подтип"
  column :only_quest, label: "Для квестов?"
  column :moderated, label: "Модерация?"
  actions
end

show do
  attributes_table do
    row :id
    row :direction
    row :age
    row :task_type
    row :subtype
    row :text
    row :answer
    row('only_quest?') { |b| status_tag b.only_quest? }
    row('moderated?') { |b| status_tag b.moderated? }
    row :created_at
    row :updated_at
    row (:pic1) { |t| image_tag(t.pic1.to_s) }
    row (:pic2) { |t| image_tag(t.pic2.to_s) }
    row (:pic3) { |t| image_tag(t.pic3.to_s) }
    row (:pic4) { |t| image_tag(t.pic4.to_s) }
    row (:pic5) { |t| image_tag(t.pic5.to_s) }
    row (:pic6) { |t| image_tag(t.pic6.to_s) }
    row (:pic7) { |t| image_tag(t.pic7.to_s) }
    row (:pic8) { |t| image_tag(t.pic8.to_s) }
    row (:pic9) { |t| image_tag(t.pic9.to_s) }
    row (:pic10) { |t| image_tag(t.pic10.to_s) }
    row (:pic11) { |t| image_tag(t.pic11.to_s) }
    row (:pic12) { |t| image_tag(t.pic12.to_s) }
  end
  active_admin_comments
end

end
