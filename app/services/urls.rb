module Urls
  MEDIA_TAGS_WITH_URLS = {
    img: :src,
    video: :src,
    source: :src,
    audio: :src,
    iframe: :src
  }.freeze

  TAGS_WITH_URLS = {
    a: :href
  }.merge(MEDIA_TAGS_WITH_URLS).freeze
end