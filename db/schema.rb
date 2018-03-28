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

ActiveRecord::Schema.define(version: 20180319034305) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "hstore"

  create_table "assignments", force: :cascade do |t|
    t.string "scaffold_association"
    t.text "description"
    t.text "wordy_details"
    t.integer "priority"
    t.boolean "active"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_assignments_on_user_id"
  end

  create_table "combo_items", force: :cascade do |t|
    t.string "model_number"
    t.string "description"
    t.string "upc"
    t.decimal "vendor_cost", default: "0.0"
    t.decimal "retail_cost", default: "0.0"
    t.decimal "shipping_cost", default: "0.0"
    t.boolean "active", default: true
    t.boolean "remove_image", default: false
    t.text "notes"
    t.hstore "details"
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
    t.index ["details"], name: "index_combo_items_on_details", using: :gin
    t.index ["slug"], name: "index_combo_items_on_slug"
  end

  create_table "combo_products", force: :cascade do |t|
    t.integer "combo_item_id"
    t.integer "product_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["combo_item_id"], name: "index_combo_products_on_combo_item_id"
    t.index ["product_id"], name: "index_combo_products_on_product_id"
  end

  create_table "comments", force: :cascade do |t|
    t.text "content"
    t.integer "commentable_id"
    t.string "commentable_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["commentable_id", "commentable_type"], name: "index_comments_on_commentable_id_and_commentable_type"
  end

  create_table "customers", force: :cascade do |t|
    t.string "firstname"
    t.string "lastname"
    t.string "company"
    t.string "address1"
    t.string "address2"
    t.string "city"
    t.string "state"
    t.string "zipcode"
    t.string "country"
    t.string "phone"
    t.string "email"
    t.hstore "details"
    t.string "lat", default: "0.0"
    t.string "long", default: "0.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ecomm_orders", force: :cascade do |t|
    t.integer "task_id"
    t.string "retailer"
    t.string "customer_name"
    t.string "order_number"
    t.datetime "order_date"
    t.hstore "details"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status", default: "New"
    t.datetime "due_date"
    t.datetime "completion_date"
    t.string "cancellation_reason"
    t.boolean "active", default: true
    t.index ["details"], name: "index_ecomm_orders_on_details"
    t.index ["task_id"], name: "index_ecomm_orders_on_task_id"
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id"
    t.index ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type"
  end

  create_table "item_uploads", force: :cascade do |t|
    t.integer "upload_id"
    t.integer "itemable_id"
    t.string "itemable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["itemable_type", "itemable_id"], name: "index_item_uploads_on_itemable_type_and_itemable_id"
    t.index ["upload_id"], name: "index_item_uploads_on_upload_id"
  end

  create_table "line_items", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "quantity", default: 0
    t.integer "product_id"
    t.integer "part_id"
    t.integer "combo_item_id"
    t.integer "ecomm_order_id"
    t.integer "warranty_order_id"
    t.decimal "item_cost", default: "0.0"
  end

  create_table "parts", force: :cascade do |t|
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
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
    t.boolean "remove_image", default: false
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.hstore "details"
    t.integer "max_quantity", default: 0
    t.string "slug"
    t.index ["details"], name: "index_parts_on_details", using: :gin
    t.index ["slug"], name: "index_parts_on_slug"
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
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
    t.boolean "remove_image", default: false
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.hstore "details"
    t.integer "max_quantity", default: 0
    t.string "slug"
    t.index ["details"], name: "index_products_on_details", using: :gin
    t.index ["slug"], name: "index_products_on_slug"
  end

  create_table "products_parts", force: :cascade do |t|
    t.integer "product_id"
    t.integer "part_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["part_id"], name: "index_products_parts_on_part_id"
    t.index ["product_id"], name: "index_products_parts_on_product_id"
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
    t.string "lat"
    t.string "long"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.hstore "details"
    t.index ["details"], name: "index_profiles_on_details", using: :gin
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.string "resource_type"
    t.bigint "resource_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id"
    t.index ["name"], name: "index_roles_on_name"
    t.index ["resource_type", "resource_id"], name: "index_roles_on_resource_type_and_resource_id"
  end

  create_table "stockmovement_batches", force: :cascade do |t|
    t.integer "user_id"
    t.string "stockmovement_type"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_stockmovement_batches_on_user_id"
  end

  create_table "stockmovements", force: :cascade do |t|
    t.integer "product_id"
    t.integer "part_id"
    t.integer "quantity"
    t.integer "adjust_quantity"
    t.integer "stockmovement_batch_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["part_id"], name: "index_stockmovements_on_part_id"
    t.index ["product_id"], name: "index_stockmovements_on_product_id"
    t.index ["stockmovement_batch_id"], name: "index_stockmovements_on_stockmovement_batch_id"
  end

  create_table "stores", force: :cascade do |t|
    t.integer "yard"
    t.string "abbrv"
    t.string "name"
    t.string "prototype"
    t.string "address"
    t.string "city"
    t.string "state"
    t.string "zipcode"
    t.float "lat"
    t.float "long"
    t.string "phone"
    t.string "service_rep"
    t.integer "service_rep_id"
    t.date "lastvisit"
    t.hstore "details"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tasks", force: :cascade do |t|
    t.string "name"
    t.bigint "initiated_by_id"
    t.bigint "initiated_for_id"
    t.string "task_type"
    t.boolean "active", default: true
    t.string "status"
    t.datetime "due_date"
    t.datetime "completion_date"
    t.hstore "details"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["details"], name: "index_tasks_on_details"
    t.index ["initiated_by_id"], name: "index_tasks_on_initiated_by_id"
    t.index ["initiated_for_id"], name: "index_tasks_on_initiated_for_id"
  end

  create_table "tracking_numbers", force: :cascade do |t|
    t.integer "line_item_id"
    t.string "carrier"
    t.string "tracking_number"
    t.decimal "shipping_cost"
    t.datetime "ship_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "shipping_method"
    t.index ["line_item_id"], name: "index_tracking_numbers_on_line_item_id"
  end

  create_table "upload_batches", force: :cascade do |t|
    t.text "notes"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_upload_batches_on_user_id"
  end

  create_table "uploads", force: :cascade do |t|
    t.string "description"
    t.integer "upload_batch_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "file_file_name"
    t.string "file_content_type"
    t.integer "file_file_size"
    t.datetime "file_updated_at"
    t.boolean "remove_file", default: false
    t.integer "uploaded_by"
    t.index ["upload_batch_id"], name: "index_uploads_on_upload_batch_id"
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
    t.boolean "admin", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "users_roles", id: false, force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "role_id"
    t.index ["role_id"], name: "index_users_roles_on_role_id"
    t.index ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id"
    t.index ["user_id"], name: "index_users_roles_on_user_id"
  end

  create_table "warranty_orders", force: :cascade do |t|
    t.integer "task_id"
    t.string "customer_name"
    t.string "order_number"
    t.integer "ecomm_order_reference"
    t.hstore "details"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "customer_id"
    t.string "status", default: "New"
    t.datetime "due_date"
    t.datetime "completion_date"
    t.string "cancellation_reason"
    t.boolean "active", default: true
    t.index ["details"], name: "index_warranty_orders_on_details"
    t.index ["task_id"], name: "index_warranty_orders_on_task_id"
  end

end
