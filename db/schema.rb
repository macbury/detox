# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_07_12_105818) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "articles", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "body"
    t.boolean "is_downloaded"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "comments_url"
    t.jsonb "poster_data"
  end

  create_table "async_job_job_blueprints", force: :cascade do |t|
    t.json "serialized_params"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.string "job_class"
    t.string "error"
    t.text "backtrace"
    t.integer "priority", default: 0
    t.string "lock_key"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "throttle_key"
    t.string "locked_by"
    t.index ["lock_key"], name: "index_async_job_job_blueprints_on_lock_key"
    t.index ["run_at", "error", "priority"], name: "index_async_job_job_blueprints_on_run_at_and_error_and_priority"
  end

  create_table "audios", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.integer "duration"
    t.string "uri"
    t.json "poster_data"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "body"
  end

  create_table "channels", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.string "source"
    t.string "site_url"
    t.text "description"
    t.datetime "last_check_at", default: "2011-06-20 14:11:59"
    t.string "error"
    t.string "status", default: "pending"
    t.string "kind", default: "rss"
    t.string "user_agent", default: "Mozilla/5.0 (Windows NT x.y; Win64; x64; rv:10.0) Gecko/20100101 Firefox/10.0"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.uuid "user_id"
    t.boolean "download_page", default: false
    t.jsonb "icon_data"
    t.string "extraction_rules", default: ""
    t.string "reject_rules", default: ""
    t.integer "archive_size", default: 35
    t.jsonb "rewrite_rules", default: []
    t.jsonb "block_rules", default: []
  end

  create_table "channels_groups", id: false, force: :cascade do |t|
    t.uuid "group_id", null: false
    t.uuid "channel_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["channel_id"], name: "index_channels_groups_on_channel_id"
    t.index ["group_id"], name: "index_channels_groups_on_group_id"
  end

  create_table "data_migrations", primary_key: "version", id: :string, force: :cascade do |t|
  end

  create_table "groups", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.uuid "user_id", null: false
    t.string "icon"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_groups_on_user_id"
  end

  create_table "pictures", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.jsonb "file"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "playbacks", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.bigint "story_id", null: false
    t.string "status"
    t.integer "position", default: 0
    t.integer "duration", default: 1
    t.datetime "resumed_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["story_id"], name: "index_playbacks_on_story_id"
  end

  create_table "pubsub_subscriptions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "channel_id"
    t.datetime "expire_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["channel_id"], name: "index_pubsub_subscriptions_on_channel_id"
  end

  create_table "sessions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id"
    t.string "ip"
    t.string "public_key"
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.jsonb "blackboard"
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "settings", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "key"
    t.string "value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "secret", default: false
    t.string "value_type"
  end

  create_table "stories", force: :cascade do |t|
    t.uuid "channel_id"
    t.string "attachment_type"
    t.uuid "attachment_id"
    t.string "title"
    t.string "permalink"
    t.string "summary"
    t.string "guid"
    t.boolean "is_read", default: false
    t.boolean "is_junk", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "published_at"
    t.datetime "view_at"
    t.datetime "read_at"
    t.boolean "is_favorite", default: false
    t.index ["attachment_type", "attachment_id"], name: "index_stories_on_attachment_type_and_attachment_id"
    t.index ["channel_id", "guid"], name: "index_stories_on_channel_id_and_guid"
    t.index ["channel_id"], name: "index_stories_on_channel_id"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "username", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "status", default: "normal"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "videos", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.integer "duration"
    t.string "uri"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.jsonb "poster_data"
    t.integer "width"
    t.integer "height"
    t.text "body"
  end

  add_foreign_key "channels_groups", "channels"
  add_foreign_key "channels_groups", "groups"
  add_foreign_key "groups", "users"
  add_foreign_key "playbacks", "stories"
end
