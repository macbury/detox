module Types
  class StoryAttachmentType < Types::BaseUnion
    description 'object attached to story like article, video or picture'
    possible_types Types::ArticleType, Types::VideoType, Types::AudioType

    def self.resolve_type(object, _context)
      if object.is_a?(Audio)
        Types::AudioType
      elsif object.is_a?(Video)
        Types::VideoType
      elsif object.is_a?(Article)
        Types::ArticleType
      else
        raise "Could not resolve attachment with type #{object}"
      end
    end
  end
end
