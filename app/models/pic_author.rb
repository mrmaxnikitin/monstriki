class PicAuthor < ActiveRecord::Base
	validates :name, presence: { message: 'Введите имя автора' }
	validates :link, uniqueness: { message: 'Этот автор уже добавлен в список' }
end
