import { useMemo } from 'react'
import { LinkingOptions } from "@react-navigation/native"
import { prefix } from '@detox/shared/urls'

export default function useLinking() : LinkingOptions {
  return useMemo(() => {
    console.log('Using prefix', prefix)
    return {
      prefixes: [prefix],
      enabled: true,
      config:{
        screens: {
          Home: {
            path: '/_',
            screens: {
              ListChannels: '/channels',
              Settings: '/settings',
              ShowGroup: {
                path: '/groups/:groupId/:storyId?',
                stringify: {
                  storyId: (storyId) => storyId || ''
                }
              },
              ListGroups: '/groups',
              UnreadStories: {
                path: '/unread/:kind/:storyId?'
              },
              RecentlyReadStories: {
                path: '/archive/:kind/:storyId?'
              },
              FavoriteStories: {
                path: '/favorite/:kind/:storyId?'
              }
            }
          },
          
          EditGroup: '/_/groups/:groupId/edit',
          NewGroup: '/_/groups/new',
          SignIn: '/_/sign_in',
          ShowArticle: '/_/stories/:storyId/article',
          PlayVideo: '/_/video/:storyId',
          PlayAudio: '/_/audio/:storyId',
          DiscoverChannels: '/_/channels/discover',
          EditChannel: '/_/channels/:channelId/edit',
          ShowChannel: '/_/channels/:channelId',
          BackgroundJobs: '/_/settings/background_jobs',
          ShowBackgroundJob: '/_/settings/background_jobs/:jobId',
          ApiExplorer: '/_/settings/explore'
        }
      }
    }
  }, [])
}