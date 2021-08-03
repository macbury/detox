module Sanitizer
  # Modify all a links to be:
  # - without tracking utm shit
  # - have noreferall
  # - have target blank attribute
  class ModifyLinks < Service
    def initialize(doc)
      @doc = doc.is_a?(String) ? Nokogiri::HTML.fragment(doc) : doc
    end

    def call
      doc.css('a').each do |node|
        node.set_attribute('target', '_blank')
      end

      doc
    end

    private

    attr_reader :content, :doc
  end
end