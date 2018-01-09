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

ActiveRecord::Schema.define(version: 20180107041848) do

  create_table "pages", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "parts", force: :cascade do |t|
    t.integer "product_id"
    t.string "manufacturer_model_number"
    t.string "srs_sku"
    t.boolean "store_orderable", default: true
    t.boolean "warranty_orderable", default: true
    t.boolean "ecomm_sku", default: false
    t.string "upc"
    t.text "description"
    t.integer "weight_pounds", default: 0
    t.integer "weight_ounces", default: 0
    t.integer "product_dims_l", default: 0
    t.integer "product_dims_w", default: 0
    t.integer "product_dims_h", default: 0
    t.integer "packaged_dims_l", default: 0
    t.integer "packaged_dims_w", default: 0
    t.integer "packaged_dims_h", default: 0
    t.string "location"
    t.integer "count_on_hand", default: 0
    t.decimal "vendor_cost", default: "0.0"
    t.decimal "retail_cost", default: "0.0"
    t.decimal "shipping_cost", default: "0.0"
    t.boolean "active", default: true
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
    t.boolean "remove_image", default: false
  end

  create_table "products", force: :cascade do |t|
    t.string "vendor_name"
    t.string "brand_name"
    t.string "manufacturer_model_number"
    t.string "srs_sku"
    t.boolean "store_orderable", default: false
    t.boolean "warranty_orderable", default: false
    t.boolean "ecomm_sku", default: false
    t.string "upc"
    t.text "description"
    t.integer "weight_pounds", default: 0
    t.integer "weight_ounces", default: 0
    t.decimal "product_dims_l", default: "0.0"
    t.decimal "product_dims_w", default: "0.0"
    t.decimal "product_dims_h", default: "0.0"
    t.decimal "packaged_dims_l", default: "0.0"
    t.decimal "packaged_dims_w", default: "0.0"
    t.decimal "packaged_dims_h", default: "0.0"
    t.string "location"
    t.integer "count_on_hand", default: 0
    t.decimal "vendor_cost", default: "0.0"
    t.decimal "retail_cost", default: "0.0"
    t.decimal "shipping_cost", default: "0.0"
    t.boolean "active", default: true
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
    t.boolean "remove_image", default: false
    t.boolean "has_parts", default: false
  end

  create_table "profiles", force: :cascade do |t|
    t.integer "user_id"
    t.string "name"
    t.string "company"
    t.string "position"
    t.string "address"
    t.string "city"
    t.string "state"
    t.string "zipcode"
    t.string "phone1"
    t.string "phone1_type"
    t.string "phone2"
    t.string "phone2_type"
    t.string "email"
    t.text "notes"
    t.float "lat"
    t.float "long"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.string "resource_type"
    t.integer "resource_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id"
    t.index ["name"], name: "index_roles_on_name"
    t.index ["resource_type", "resource_id"], name: "index_roles_on_resource_type_and_resource_id"
  end

  create_table "stockmovement_batches", force: :cascade do |t|
    t.integer "stockmovement_id"
    t.integer "user_id"
    t.string "stockmovement_type"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stockmovements", force: :cascade do |t|
    t.integer "product_id"
    t.integer "part_id"
    t.integer "quantity"
    t.integer "adjust_quantity"
    t.integer "stockmovement_batch_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "user_color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin", default: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "users_roles", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "role_id"
    t.index ["role_id"], name: "index_users_roles_on_role_id"
    t.index ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id"
    t.index ["user_id"], name: "index_users_roles_on_user_id"
  end

end
