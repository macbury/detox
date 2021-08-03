# This struct contains basic story metadata and should be used as abstract data container for all stories.
# For example rss entry should extract only basic information and generate this struct
class EntryMetaData < Dry::Struct
  attribute :guid, Types::String
  attribute :title, Types::String
  attribute :permalink, Types::String
  attribute :poster_url, Types::String.optional
  attribute :comments_url, Types::String.optional
  attribute :body, Types::String
  attribute :published_at, Types::Time
  attribute :media_url, Types::String.optional
end