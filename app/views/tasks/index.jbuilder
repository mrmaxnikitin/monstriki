json.array! @tasks do |p|
  json.id p.id
  json.direction p.direction
  json.task_type p.task_type
  json.subtype p.subtype
  json.age p.age
  json.text p.text
  json.pic1 p.pic1
  json.pic2 p.pic2
  json.pic3 p.pic3
  json.pic4 p.pic4
  json.pic5 p.pic5
  json.pic6 p.pic6
  json.pic7 p.pic7
  json.pic8 p.pic8
  json.pic9 p.pic9
  json.pic10 p.pic10
  json.pic11 p.pic11
  json.pic12 p.pic12
  json.answer p.answer
  json.time l(p.created_at)
end

json.array! @extra_tasks do |p|
  json.id p.id
  json.direction p.direction
  json.task_type p.task_type
  json.subtype p.subtype
  json.age p.age
  json.text p.text
  json.pic1 p.pic1
  json.pic2 p.pic2
  json.pic3 p.pic3
  json.pic4 p.pic4
  json.pic5 p.pic5
  json.pic6 p.pic6
  json.pic7 p.pic7
  json.pic8 p.pic8
  json.pic9 p.pic9
  json.pic10 p.pic10
  json.pic11 p.pic11
  json.pic12 p.pic12
  json.answer p.answer
  json.time l(p.created_at)
end