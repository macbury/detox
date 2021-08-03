module Urls
  # Some webpages try to be cool and use javascript to select best quality of image, of course this breaks
  # scraping(and browsing for people without js).
  class ExpandDynamicImages < Service
    TAGS_WITH_DYNAMIC_IMAGES = 'img, div'.freeze
    CANDIDATE_ATTRS = [
      'data-src',
      'data-original',
      'data-orig',
      'data-url',
      'data-orig-file',
      'data-large-file',
      'data-medium-file',
      'data-2000src',
      'data-1000src',
      'data-800src',
      'data-655src',
      'data-500src',
      'data-380src',
    ].freeze

    def initialize(doc)
      @doc = doc.is_a?(String) ? Nokogiri::HTML.fragment(doc) : doc
    end

    def call
      doc.css(TAGS_WITH_DYNAMIC_IMAGES).each do |node|
        CANDIDATE_ATTRS.each do |candidate_attr|
          src = node.get_attribute(candidate_attr)
          next unless src

          if node.name == 'img'
            node.set_attribute('src', src)
          else
            alt_attr = node.get_attribute('alt') || ''
            node.replace("<img src='#{src}' alt=#{alt_attr} />")
          end
        end
      end

      doc
    end

    private

    attr_reader :doc, :base_url
  end
end