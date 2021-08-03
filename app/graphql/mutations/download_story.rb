module Mutations
  class DownloadStory < BaseMutation
    use Download::StoryContent, as: :download_story
    null true
    description 'Download story using rules configured in channel settings'

    argument :id, ID, required: true, description: 'Story ids'

    field :errors, [String], null: false
    field :story, Types::StoryType, null: true

    def resolve(id:)
      story = Story.find_by_hashid!(id)
      authorize! story, to: :download?

      download_story(story: story)

      {
        story: story,
        errors: []
      }
    end
  end
end
