Rails.application.routes.draw do
  devise_for :users, skip: :all

  # constraints ->(request) { Auth::AdminConstraint.call(request) } do
  #   # get '/backup' => 'backup#show'
  # end

  get '/data/software_update/apk', to: 'native#apk', as: :apk_download
  get '/data/software_update', to: 'native#show', as: :update
  get '/data/opml/export', to: 'opml#export', as: :export_opml
  match '/data/pubsub/:id', to: 'pubsub#callback', via: [:get, :post], as: :pubsub
  match '/data', to: 'graphql#execute', via: [:get, :post]

  get '*path' => 'home#index'
  root 'home#index'
end
