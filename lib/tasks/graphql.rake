require 'graphql/rake_task'

GraphQL::RakeTask.new(
  schema_name: 'DetoxSchema',
  json_outfile: 'app/javascript/api/schema.json',
  idl_outfile: 'app/javascript/api/schema.graphql'
)

namespace :graphql do
  desc 'Generate client headers'
  task dump: :environment do
    Rake::Task['graphql:schema:dump'].invoke
    frontend_path = Rails.root.join('app/javascript/api')
    puts "Opening #{frontend_path}"
    puts `cd #{frontend_path} && yarn graphql:codegen`
  end
end