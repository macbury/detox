require "dry/cli"

module AsyncJob
  module CLI
    extend Dry::CLI::Registry

    class Version < Dry::CLI::Command
      desc "Print version"

      def call(*)
        puts AsyncJob::VERSION
      end
    end

    class Start < Dry::CLI::Command
      desc "Start job processing"

      option :concurrency, type: :number, default: 10, desc: 'Number of processed jobs', aliases: ['-c']

      def call(concurrency:)
        @controller = AsyncJob::Controller.new(
          concurrency: concurrency.to_i,
          schedule: YAML.load(Rails.root.join('config/schedule.yml').read).symbolize_keys.fetch(:schedule)
        )
        @controller.wait
        @controller.run
      ensure
        @controller&.cleanup
      end
    end

    register "start", Start
    register "version", Version, aliases: ["v", "-v", "--version"]
  end
end
