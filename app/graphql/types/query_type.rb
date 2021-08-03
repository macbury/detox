module Types
  class QueryType < Types::BaseObject
    field :settings, resolver: Resolvers::Settings, authorized_scope: { with: SettingPolicy }
    field :current_user, type: CurrentUserType, null: true, description: 'Get current user information', authorize: true
    field :users, resolver: Resolvers::Users, authorize: true
    field :channels, resolver: Resolvers::Channels, authorized_scope: { with: ChannelPolicy }
    field :get_channel, resolver: Resolvers::GetChannel, authorize: true

    field :groups, resolver: Resolvers::Groups, authorize: true
    field :get_group, resolver: Resolvers::GetGroup, authorize: true
    field :stories, resolver: Resolvers::Stories, preauthorize: { with: StoryPolicy, to: :list? }
    field :get_story, resolver: Resolvers::GetStory, authorize: true

    field :background_jobs, resolver: Resolvers::BackgroundJobs, authorize: { with: BackgroundJobsPolicy }
    field :get_background_job, resolver: Resolvers::GetBackgroundJob, authorize: { with: BackgroundJobsPolicy }

    field :unread_stories, UnreadStoriesType, null: true, preauthorize: { with: StoryPolicy, to: :list? }

    def unread_stories
      {}
    end
  end
end
