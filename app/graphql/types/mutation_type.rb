module Types
  class MutationType < Types::BaseObject
    field :refresh, mutation: Mutations::Refresh
    field :refresh_all, mutation: Mutations::RefreshAll
    field :discover, mutation: Mutations::Discover
    field :reimport_stories, mutation: Mutations::ReimportStories
    field :subscribe, mutation: Mutations::Subscribe
    field :unsubscribe, mutation: Mutations::Unsubscribe
    field :update_channel, mutation: Mutations::UpdateChannel

    field :logout, mutation: Mutations::Logout
    field :sign_in, mutation: Mutations::SignIn

    field :create_user, mutation: Mutations::CreateUser
    field :update_user, mutation: Mutations::UpdateUser
    field :update_password, mutation: Mutations::UpdatePassword

    field :snooze, mutation: Mutations::Snooze
    field :update_story, mutation: Mutations::UpdateStory
    field :mark_stories, mutation: Mutations::MarkStories
    field :download_story, mutation: Mutations::DownloadStory
    field :update_playback, mutation: Mutations::UpdatePlayback

    field :update_settings, mutation: Mutations::UpdateSetting

    field :clear_jobs, mutation: Mutations::ClearJobs
    
    field :create_group, mutation: Mutations::CreateGroup
    field :update_group, mutation: Mutations::UpdateGroup
  end
end
