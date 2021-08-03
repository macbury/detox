Feedjira::Feed.add_common_feed_entry_element('comments', as: :comments_url)
Feedjira::Feed.add_common_feed_entry_element('enclosure', value: :length, as: :enclosure_length)
Feedjira::Feed.add_common_feed_entry_element('enclosure', value: :type, as: :enclosure_type)
Feedjira::Feed.add_common_feed_entry_element('enclosure', value: :url, as: :enclosure_url)
Feedjira::Feed.add_common_feed_entry_element('itunes:image', value: :href, as: :enclosure_poster)

Feedjira.configure do |config|
  config.parsers = [
    Feedjira::Parser::Atom,
    Feedjira::Parser::RSS,
    Feedjira::Parser::ITunesRSS
  ]
end