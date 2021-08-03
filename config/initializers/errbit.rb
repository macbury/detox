# if ENV.key?('AIRBREAK_KEY')
#   require 'airbreak'

#   Airbrake.configure do |config|
#     config.host = ENV.fetch('AIRBREAK_HOST')
#     config.project_id = 1 # required, but any positive integer works
#     config.project_key = ENV.fetch('AIRBREAK_KEY')
#     config.performance_stats = false
  
#     # Uncomment for Rails apps
#     config.environment = Rails.env
#     config.ignore_environments = %w(development test)
#   end
# end