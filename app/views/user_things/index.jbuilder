json.array! @things do |t|
  json.thing_id t.thing.id
  json.user_thing_id t.id
  json.name t.thing.name
  json.img t.thing.img
  json.price t.thing.price
  json.active t.active
end