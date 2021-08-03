def deep_reject(hash, &block)
  hash.each_with_object({}) do |(k, v), memo|
    unless block.call(k, v)
      if v.is_a?(Hash)
        memo[k] = deep_reject(v, &block)
      else
        memo[k] = v
      end
    end
  end
end

namespace :translations do
  desc 'Dump translations to json'
  task dump: :environment do
    Rake::Task["translations:native"].invoke
    Rake::Task["translations:web"].invoke
  end

  desc 'Dump native translations to json'
  task native: :environment do
    I18n.backend.reload!
    I18n.backend.eager_load!
    locales_path = Rails.root.join('app/javascript/api/locales')
    locales_path.mkdir unless locales_path.exist?
    locales_path = locales_path.join('native.json')
    puts "Generating locales: #{locales_path}"
    file = File.new(locales_path, 'w')
    translations = deep_reject(I18n.backend.translations) { |k, v| v.is_a?(Proc) }
    file.write JSON.pretty_generate(translations)
    file.close
  end

  desc 'Dump web translations to json'
  task web: :environment do
    I18n.backend.reload!
    I18n.backend.eager_load!
    locales_path = Rails.root.join('app/javascript/api/locales/')
    translations = deep_reject(I18n.backend.translations) { |k, v| v.is_a?(Proc) }

    I18n.available_locales.each do |locale|
      locale_dir_path = locales_path.join(locale.to_s)
      locale_dir_path.mkdir unless locale_dir_path.exist?
      locale_path = locale_dir_path.join('common.json')
      puts "Generating locales: #{locale_path}"

      file = File.new(locale_path, 'w')
      file.write JSON.pretty_generate(translations[locale])
      file.close
    end
  end
end