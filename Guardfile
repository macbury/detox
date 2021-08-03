ignore 'app/javascript/node_modules', 'app/javascript/shared/node_modules', 'app/javascript/client/node_modules', 'app/javascript/styleguide/node_modules', 'app/javascript/store/node_modules', 'app/javascript/client/node_modules', 'app/javascript/warp-pipe/node_modules'
directories %w(app/graphql config/locales)

group :frontend do
  guard 'rake', task: 'translations:dump', run_on_start: true do
    watch(%r{config/locales})
  end

  guard 'rake', task: 'graphql:dump', run_on_start: true do
    watch(%r{app/graphql})
  end
end