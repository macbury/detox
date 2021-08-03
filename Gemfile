source 'https://rubygems.org'
git_source(:github) { |_repo| 'https://github.com/#{repo}.git' }

ruby '3.0.0'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.1.1', '>= 6.1.1'
gem 'rails-i18n', '~> 6.0'
# Use postgresql as the database for Active Record
gem 'pg'
gem 'action_policy'
gem 'action_policy-graphql'
# Use Puma as the app server
gem 'falcon'
gem 'http-cookie'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.2', require: false

gem 'color_diff', '~> 0.1'
gem 'streamio-ffmpeg', '~> 3.0', '>= 3.0.2'

gem 'rack-cors'
gem 'fast_blank'
gem 'opml-handler'
gem 'addressable', '~> 2.7'
gem 'user-agent-randomizer', require: 'user_agent_randomizer'
gem 'devise'
gem 'shrine', '~> 3.0'
gem 'http'
gem 'terrapin'
gem 'dotenv-rails'
gem 'feedjira'
gem 'graphql'
gem 'jwt'
gem 'rails-controller-testing'
gem 'rails-html-sanitizer'
gem 'pry'
gem 'pry-rails'
gem 'image_processing'
gem 'data_migrate'
gem 'hashid-rails'

gem 'redis'
gem 'ruby-readability', require: 'readability'
gem 'search_object'
gem 'search_object_graphql'
gem 'youtube_id'
gem 'dry-struct'
gem 'chronic'
gem 'rmagick'
gem 'blurhash', git: 'https://github.com/Gargron/blurhash.git'
gem 'fastimage'
gem 'open_uri_redirections'
gem 'foreman'
gem 'async_job', path: './engine/async_job'
gem 'graphql-rails_logger'
gem 'ar_lazy_preload'
gem 'rack-floc-off', '~> 0.0.2'
# gem 'airbrake', '~> 5.0'

group :development, :test do
  gem 'guard'
  gem 'guard-rake'
  gem 'rspec-snapshot'
  gem 'spring'
  gem 'spring-commands-rspec'
  gem 'spring-commands-rubocop'
  gem 'i18n-tasks'
  gem 'pry-byebug'
  gem 'byebug'
  gem 'execution_time', '~> 0.1.2' # causes irb bug
  gem 'factory_bot'
  gem 'factory_bot_rails'
  gem 'pry-remote'
  gem 'rspec-rails'
  gem 'rubocop', require: false
  gem 'rubocop-graphql', require: false
  gem 'rubocop-performance', '~> 1.6', '>= 1.6.1'
  gem 'rubocop-rails', '~> 2.6'
  gem 'rubocop-rspec', require: false
  gem 'async-rspec', require: false
  gem 'listen'
end

group :test do
  gem 'rest-client'
  gem 'database_cleaner'
  gem 'faker'
  gem 'fakeredis'
  gem 'shoulda'
  gem 'timecop', '~> 0.9.1'
  gem 'webmock'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
