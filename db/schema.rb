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

ActiveRecord::Schema.define(version: 20160811180110) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "quests", force: :cascade do |t|
    t.text     "age3",                    array: true
    t.text     "age4",                    array: true
    t.text     "age5",                    array: true
    t.text     "age6",                    array: true
    t.text     "age7",                    array: true
    t.text     "age8",                    array: true
    t.text     "age9",                    array: true
    t.text     "age10",                   array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tasks", force: :cascade do |t|
    t.string   "direction"
    t.integer  "task_type"
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
    t.string   "answer"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean  "for_quest"
    t.string   "pic9"
    t.string   "pic10"
    t.string   "pic11"
    t.string   "pic12"
    t.integer  "subtype"
  end

  create_table "things", force: :cascade do |t|
    t.string   "name"
    t.string   "img"
    t.integer  "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tracks", force: :cascade do |t|
    t.integer  "current_quest",  default: 1
    t.boolean  "complete_quest", default: false
    t.integer  "user_id"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  add_index "tracks", ["user_id"], name: "index_tracks_on_user_id", using: :btree

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
    t.string   "email",                                       null: false
    t.string   "crypted_password"
    t.string   "salt"
    t.string   "name"
    t.integer  "age"
    t.integer  "character"
    t.integer  "score",                           default: 0
    t.integer  "goal"
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

  add_foreign_key "tracks", "users"
  add_foreign_key "user_things", "things"
  add_foreign_key "user_things", "users"
end
