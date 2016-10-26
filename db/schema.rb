# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161025222458) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string   "namespace"
    t.text     "body"
    t.string   "resource_id",   null: false
    t.string   "resource_type", null: false
    t.integer  "author_id"
    t.string   "author_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "active_admin_comments", ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id", using: :btree
  add_index "active_admin_comments", ["namespace"], name: "index_active_admin_comments_on_namespace", using: :btree
  add_index "active_admin_comments", ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id", using: :btree

  create_table "honors", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "quest_id"
    t.integer  "price",      default: 50
    t.integer  "honor_type"
    t.integer  "degree"
    t.boolean  "paid",       default: false
    t.string   "name"
    t.string   "age"
    t.string   "school"
    t.string   "curator"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  add_index "honors", ["user_id", "quest_id"], name: "index_honors_on_user_id_and_quest_id", unique: true, using: :btree
  add_index "honors", ["user_id"], name: "index_honors_on_user_id", using: :btree

  create_table "monsters", force: :cascade do |t|
    t.string   "avatar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "quests", force: :cascade do |t|
    t.text     "age3",                                                             array: true
    t.text     "age4",                                                             array: true
    t.text     "age5",                                                             array: true
    t.text     "age6",                                                             array: true
    t.text     "age7",                                                             array: true
    t.text     "age8",                                                             array: true
    t.text     "age9",                                                             array: true
    t.text     "age10",                                                            array: true
    t.datetime "created_at",                                          null: false
    t.datetime "updated_at",                                          null: false
    t.boolean  "checkpoint",      default: false
    t.string   "background",      default: "/images/background1.jpg"
    t.string   "posx_background", default: "0"
    t.string   "posy_background", default: "0"
    t.string   "tour_name"
    t.string   "task_text_color", default: "#ffffff"
  end

  create_table "task_errors", force: :cascade do |t|
    t.integer  "task_id"
    t.integer  "user_id"
    t.string   "text"
    t.boolean  "completed",  default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "tasks", force: :cascade do |t|
    t.string   "direction"
    t.integer  "task_type"
    t.integer  "subtype"
    t.integer  "age"
    t.string   "text"
    t.string   "pic1"
    t.string   "pic2"
    t.string   "pic3"
    t.string   "pic4"
    t.string   "pic5"
    t.string   "pic6"
    t.string   "pic7"
    t.string   "pic8"
    t.string   "pic9"
    t.string   "pic10"
    t.string   "pic11"
    t.string   "pic12"
    t.string   "answer"
    t.boolean  "in_quest",   default: false
    t.boolean  "only_quest", default: false
    t.boolean  "sample",     default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.boolean  "moderated",  default: false
    t.string   "config"
  end

  create_table "things", force: :cascade do |t|
    t.string   "name"
    t.string   "img"
    t.integer  "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "thing_type"
  end

  create_table "tracks", force: :cascade do |t|
    t.integer  "current_quest",  default: 1
    t.boolean  "complete_quest", default: false
    t.integer  "user_id"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.string   "answers"
  end

  add_index "tracks", ["user_id"], name: "index_tracks_on_user_id", using: :btree

  create_table "user_monsters", force: :cascade do |t|
    t.string   "name"
    t.integer  "user_id"
    t.integer  "monster_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "user_monsters", ["user_id"], name: "index_user_monsters_on_user_id", using: :btree

  create_table "user_things", force: :cascade do |t|
    t.boolean  "active"
    t.integer  "user_id"
    t.integer  "thing_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "user_things", ["thing_id"], name: "index_user_things_on_thing_id", using: :btree
  add_index "user_things", ["user_id", "thing_id"], name: "index_user_things_on_user_id_and_thing_id", unique: true, using: :btree
  add_index "user_things", ["user_id"], name: "index_user_things_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                                                           null: false
    t.string   "crypted_password"
    t.string   "salt"
    t.string   "name"
    t.integer  "age"
    t.integer  "score",                           default: 0
    t.string   "goal"
    t.boolean  "admin",                           default: false
    t.datetime "payment_end_date",                default: '2016-08-26 18:15:38'
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "remember_me_token"
    t.datetime "remember_me_token_expires_at"
    t.string   "reset_password_token"
    t.datetime "reset_password_token_expires_at"
    t.datetime "reset_password_email_sent_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["remember_me_token"], name: "index_users_on_remember_me_token", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", using: :btree

  create_table "votes", force: :cascade do |t|
    t.integer  "votable_id"
    t.string   "votable_type"
    t.integer  "voter_id"
    t.string   "voter_type"
    t.boolean  "vote_flag"
    t.string   "vote_scope"
    t.integer  "vote_weight"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "votes", ["votable_id", "votable_type", "vote_scope"], name: "index_votes_on_votable_id_and_votable_type_and_vote_scope", using: :btree
  add_index "votes", ["voter_id", "voter_type", "vote_scope"], name: "index_votes_on_voter_id_and_voter_type_and_vote_scope", using: :btree

  add_foreign_key "honors", "quests"
  add_foreign_key "honors", "users"
  add_foreign_key "task_errors", "tasks"
  add_foreign_key "tracks", "users"
  add_foreign_key "user_monsters", "users"
  add_foreign_key "user_things", "things"
  add_foreign_key "user_things", "users"
end
