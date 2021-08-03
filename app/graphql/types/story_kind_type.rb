module Types
  class StoryKindType < Types::BaseEnum
    graphql_name 'StoryKind'

    value 'All', value: 'all'
    value 'Readable', value: 'readable'
    value 'Playable', value: 'playable'
    value 'Viewable', value: 'viewable'
  end
end
