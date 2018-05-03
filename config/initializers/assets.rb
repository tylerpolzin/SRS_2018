# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'
Rails.application.config.assets.precompile += %w( *.png *.jpg *.jpeg *.gif *.bmp )
Rails.application.config.assets.precompile += %w( combo_items.js )
Rails.application.config.assets.precompile += %w( ecomm_orders.js )
Rails.application.config.assets.precompile += %w( parts.js )
Rails.application.config.assets.precompile += %w( products.js )
Rails.application.config.assets.precompile += %w( stockmovement_batches.js )
Rails.application.config.assets.precompile += %w( tasks.js )
Rails.application.config.assets.precompile += %w( uploads.js )
Rails.application.config.assets.precompile += %w( users.js )

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )
