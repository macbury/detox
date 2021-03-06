# This file is copied to spec/ when you run 'rails generate rspec:install'
require 'spec_helper'
require File.expand_path('../config/environment', __dir__)
# Prevent database truncation if the environment is production
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'rspec/rails'
require 'async/io'
require 'database_cleaner'
require 'faker'
require 'fakeredis/rspec'
require 'async/rspec'
require 'webmock/rspec'
require "shrine/storage/memory"
# Add additional requires below this line. Rails is not loaded until this point!

# Requires supporting ruby files with custom matchers and macros, etc, in
# spec/support/ and its subdirectories. Files matching `spec/**/*_spec.rb` are
# run as spec files by default. This means that files in spec/support that end
# in _spec.rb will both be required and run as specs, causing the specs to be
# run twice. It is recommended that you do not name files matching this glob to
# end with _spec.rb. You can configure this pattern with the --pattern
# option on the command line or in ~/.rspec, .rspec or `.rspec-local`.
#
# The following line is provided for convenience purposes. It has the downside
# of increasing the boot-up time by auto-requiring all files in the support
# directory. Alternatively, in the individual `*_spec.rb` files, manually
# require only the support files necessary.
#
Dir[Rails.root.join('spec', 'support', '**', '*.rb')].sort.each { |f| require f }

# Checks for pending migrations and applies them before tests are run.
# If you are not using ActiveRecord, you can remove these lines.
begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  puts e.to_s.strip
  exit 1
end

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end

ENV['SECRET_KEY_BASE'] = Rails.application.credentials.secret_key_base = 'f1CdeOCEXkTYh32CANNNUSmEeH1iY133A7XEi2KRCeuk7pzhBNF7lefNNiFbv4lBl4xoxH06JpO1TsKOrNJFntTI8NEBDkDnF6O'
ENV['PROXY_KEY'] = '0x24FEEDFACEDEADBEEFCAFE'
ENV['APP_HOST'] = 'http://localhost:8080'

Shrine.storages = { 
  cache: Shrine::Storage::Memory.new,
  store: Shrine::Storage::Memory.new
}

RSpec.configure do |config|
  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  config.example_status_persistence_file_path = ::Rails.root.join('tmp/examples.txt')
  config.include FactoryBot::Syntax::Methods
  [:controller, :view, :request].each do |type|
    config.include ::Rails::Controller::Testing::TestProcess, type: type
    config.include ::Rails::Controller::Testing::TemplateAssertions, type: type
    config.include ::Rails::Controller::Testing::Integration, type: type
  end
  config.include ActiveJob::TestHelper
  config.include ProxySupport, type: :proxy

  config.include ActionDispatch::TestProcess::FixtureFile

  config.use_transactional_fixtures = false
  config.snapshot_dir = "spec/fixtures/snapshots"
  config.before(:suite) do
    WebMock.disable_net_connect!
    DatabaseCleaner.strategy = :truncation
    DatabaseCleaner.clean_with(:truncation)
  end

  config.around do |example|
    DatabaseCleaner.cleaning do
      Time.zone = 'UTC'
      example.run
    end
  end

  # You can uncomment this line to turn off ActiveRecord support entirely.
  # config.use_active_record = false

  # RSpec Rails can automatically mix in different behaviours to your tests
  # based on their file location, for example enabling you to call `get` and
  # `post` in specs under `spec/controllers`.
  #
  # You can disable this behaviour by removing the line below, and instead
  # explicitly tag your specs with their type, e.g.:
  #
  #     RSpec.describe UsersController, type: :controller do
  #       # ...
  #     end
  #
  # The different available types are documented in the features, such as in
  # https://relishapp.com/rspec/rspec-rails/docs
  config.infer_spec_type_from_file_location!

  # Filter lines from Rails gems in backtraces.
  config.filter_rails_from_backtrace!
  # arbitrary gems may also be filtered via:
  # config.filter_gems_from_backtrace("gem name")
end
