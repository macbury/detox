$:.push File.expand_path("lib", __dir__)

# Maintain your gem's version:
require "async_job/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |spec|
  spec.name        = "async_job"
  spec.version     = AsyncJob::VERSION
  spec.authors     = ["macbury"]
  spec.email       = ["me@macbury.ninja"]
  spec.homepage    = ""
  spec.summary     = ": Summary of AsyncJob."
  spec.description = ": Description of AsyncJob."
  spec.license     = "MIT"

  spec.bindir = "exe"
  spec.executables = %w[async_job]

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    spec.metadata["allowed_push_host"] = ": Set to 'http://mygemserver.com'"
  else
    raise "RubyGems 2.0 or newer is required to protect against " \
      "public gem pushes."
  end

  spec.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  spec.add_dependency "rails", "~> 6.1.1", ">= 6.1.1"
  spec.add_dependency "async", "~> 1.27.0"
  spec.add_dependency "dry-cli", "~> 0.6"
  spec.add_dependency 'async-http', '~> 0.54.1'
  spec.add_dependency "async-container", "~> 0.16.8"
  spec.add_dependency "activejob", ">= 5.1.0"
  spec.add_dependency "activerecord", ">= 5.1.0"
  spec.add_dependency "rufus-scheduler", ">= 3.6.0"

  spec.add_development_dependency "pg"
end
