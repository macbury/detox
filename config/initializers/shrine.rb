require 'shrine'
require 'shrine/storage/file_system'

Shrine.storages = { 
  cache: Shrine::Storage::FileSystem.new(Rails.root.join('tmp/cache'), prefix: 'shrine'), # temporary 
  store: Shrine::Storage::FileSystem.new('public', prefix: 'data'),       # permanent 
}

Shrine.plugin :instrumentation if Rails.env.development?
Shrine.plugin :activerecord
Shrine.plugin :cached_attachment_data
Shrine.plugin :restore_cached_data