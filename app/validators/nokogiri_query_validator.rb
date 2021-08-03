class NokogiriQueryValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    return if value.empty?

    Nokogiri::HTML.fragment('').search(value)
  rescue Nokogiri::CSS::SyntaxError => e
    record.errors.add(attribute, e.to_s)
  end
end