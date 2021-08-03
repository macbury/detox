module Sanitizer
  class Scrubber < Rails::Html::PermitScrubber
    PERMITTED_TAGS = %w(table tfoot thead td th div span a ul ol li p br h1 h2 h3 h4 h5 h6 sup dl dt dd abbr small source address hr sup sub code pre strong b i em u img video figure blockquote).freeze
    ALLOWED_ATTRIBUTES = %w( href src controls target alt title data-detox-src colspan rowspan ).freeze

    def initialize
      super
      self.tags = PERMITTED_TAGS
      self.attributes = ALLOWED_ATTRIBUTES
    end
  end
end