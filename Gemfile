source 'https://rubygems.org'
ruby '2.3.4'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

# Default Installs
gem 'rails', '~> 5.1.4' # Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'puma', '~> 3.7' # Use Puma as the app server
gem 'sass-rails', '~> 5.0' # Use SCSS for stylesheets
gem 'uglifier', '>= 1.3.0' # Use Uglifier as compressor for JavaScript assets
gem 'coffee-rails', '~> 4.2' # Use CoffeeScript for .coffee assets and views
gem 'jquery-rails' # Use jquery as the JavaScript library
gem 'turbolinks', '~> 5' # Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'jbuilder', '~> 2.5' # Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'pg', '~> 0.18'

# Custom Installs
gem 'bootstrap-sass'
gem "bootstrap_form", "~> 2.7" # Use 2.7 so forms don't break with Bootstrap 3, Check for updates periodically
gem 'font-awesome-rails'
gem 'hirb'
gem 'devise'
gem 'rolify'
# gem 'cancancan'
gem "paperclip"
gem 'aws-sdk-s3' # Use for Paperclip uploads
gem 'best_in_place'
gem 'underscore-rails'
gem 'gmaps4rails'
gem 'ajax-datatables-rails' # Didn't use before, https://github.com/jbox-web/ajax-datatables-rails
# gem 'jquery-datatables-rails'
gem 'jquery-ui-rails'
# gem 'jquery-fileupload-rails'
# gem 'jquery_context_menu-rails'
gem 'select2-rails'
gem 'bootstrap-datepicker-rails'
gem 'bootbox-rails', '~>0.4' # Wrappers for Javascript Alerts
gem 'friendly_id', '~> 5.1.0'
gem 'csso-rails' # Use for optimizing and compressing CSS
gem 'html5_validators' # converts Rails validators to HTML5 "required" validators
gem 'jquery-inputmask-rails', github: 'knapo/jquery-inputmask-rails'
gem 'country_select'
gem 'rabl'
gem 'devise-token_authenticatable'

# gem 'nprogress-rails' # Use to add Loading Progress bar, https://github.com/caarlos0-graveyard/nprogress-rails
# gem 'approval' # Use to require approval on database changes
# gem 'chartkick' # Use for adding good looking graphs and pie charts to pages
# gem 'smarter_csv' # If CSV importing ever becomes a thing, this will be essential
# gem 'letter_opener', :group => :development # Use if email is ever implemented, https://github.com/ryanb/letter_opener
# gem 'paranoia' # Maybe use this for soft-deleting records, https://github.com/rubysherpas/paranoia
# gem 'acts-as-taggable-on', '~> 4.0' # Use to add tags to models, https://github.com/mbleigh/acts-as-taggable-on
# gem 'auto-session-timeout' # https://github.com/pelargir/auto-session-timeout

# gem 'active_shipping'

# gem 'rubyzip' # Use for zipping files, not sure if needed yet

# gem 'axlsx', '2.1.0.pre'
# gem 'axlsx_rails'
# gem 'acts_as_xlsx', :git => "git://github.com/straydogstudio/acts_as_xlsx.git"


# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  # Use sqlite3 as the database for Active Record

  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
  # Custom Installs
  gem 'derailed' # Use for benchmarking memory usage
  gem 'seed_dump' # Generates seed file from existing database, use for dumping database and re-upping
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'active_record_doctor' # Use to help with Indexes in the database -- https://github.com/gregnavis/active_record_doctor
  gem 'brakeman', :require => false
  gem 'annotate' # Use to add schema information to the top of models
  gem 'rails-erd', :require => false
end

group :production do

end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
