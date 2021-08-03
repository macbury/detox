import { NavigationProp } from '@react-navigation/native'
import { Channel, Story, StoryKind } from '@detox/api'
import queryString from 'query-string'
import * as Linking from 'expo-linking';
import { TUrlProps } from './types/urls'
import OS from './os'

export const prefix = Linking.createURL('/');

export type TLinkProps = {
  to: string;
  navigateWith(navigation : NavigationProp<any>)
}

export type TStory = {
  id: string
  __typename: string
  attachment: {
    __typename: string
  }
}

export function buildPath(path : string, query? : any) {
  if (query && Object.values(query).length > 0) {
    return Linking.createURL(`${path}?${queryString.stringify(query)}`)
  } else {
    return Linking.createURL(path)
  }
}

export function signInPath() : TUrlProps {
  return { 
    routeName: 'SignIn', 
    web: { path: '/_/sign_in' } 
  }
}

export function channelsPath() : TUrlProps {
  const path = buildPath('/_/channels')
  return {
    routeName: 'Home',
    params: { screen: 'ListChannels' },
    web: { path: path, as: path } 
  }
}

export function channelPath(channelId: string) : TUrlProps {
  const path = buildPath(`/_/channels/${channelId}`)
  return {
    web: { path: path, as: path },
    routeName: 'ShowChannel',
    params: { channelId }
  }
}

export function editChannelPath(channelId: string) : TUrlProps {
  const path = buildPath(`/_/channels/${channelId}/edit`)
  return {
    web: { path, as: path }, 
    routeName: 'EditChannel',
    params: { channelId }
  }
}

export function discoverChannelPath() : TUrlProps {
  const path = buildPath(`/_/channels/discover`)
  return {
    web: { path },
    routeName: 'DiscoverChannels'
  }
}

export function articlePath(storyId : string) : TUrlProps {
  const path = buildPath(`/_/stories/${storyId}/article`)
  return {
    web: { path, as: path },
    routeName: 'ShowArticle',
    params: { storyId }
  }
}

export function videoPath(storyId : string) : TUrlProps {
  const path = buildPath(`/_/video/${storyId}`)
  return {
    web: { path, as: path },
    routeName: 'PlayVideo',
    params: { storyId }
  }
}

export function audioPath(storyId : string) : TUrlProps {
  const path = buildPath(`/_/audio/${storyId}`)
  return {
    web: { path, as: path },
    routeName: 'PlayAudio',
    params: { storyId }
  }
}

export function storyPath({ id, attachment: { __typename } } : TStory) : TUrlProps {
  switch(__typename) {
    case 'Audio':
      return audioPath(id)
    case 'Article':
      return articlePath(id)
    case 'Video':
      return videoPath(id)
    default:
      throw `Unsupported attachment type for building story path: ${__typename}`
  }
}


export function unreadStoriesPath(channel?: Channel) : TUrlProps {
  const path = buildPath('/_/unread/All', { channelId: channel?.id })

  return { 
    native: {
      navigationBehavior: 'navigate'
    },
    routeName: 'Home',
    params: { screen: 'UnreadStories', params: { storyId: '', channelId: channel?.id } },
    web: { path, as: path } 
  }
}

export function favoriteStoriesPath(channel?: Channel) : TUrlProps {
  const path = buildPath('/_/favorite/All', { channelId: channel?.id })

  return { 
    native: {
      navigationBehavior: 'navigate'
    },
    routeName: 'Home',
    params: { screen: 'FavoriteStories', params: { storyId: '', channelId: channel?.id } },
    web: { path, as: path } 
  }
}


export function recentlyReadStoriesPath(channel?: Channel) : TUrlProps {
  const path = buildPath('/_/archive/All', { channelId: channel?.id })

  return {
    native: {
      navigationBehavior: 'navigate'
    },
    routeName: 'Home',
    params: { screen: 'RecentlyReadStories', params: { storyId: '', channelId: channel?.id } },
    web: { path, as: path } 
  }
}

export function unreadDesktopStoryPath(story : TStory, kind : StoryKind) : TUrlProps {
  const { id: storyId, attachment: { __typename } } = story
  switch(__typename) {
    case 'Article':
      const path = buildPath(`/_/unread/${kind}/${storyId}`)

      return {
        native: {
          navigationBehavior: 'navigate'
        },
        routeName: 'Home',
        web: { path, as: path },
        params: {
          screen: 'UnreadStories',
          params: { storyId, kind }
        }
      }
    default:
      return storyPath(story)
  }
}

export function archiveDesktopStoryPath(story : TStory, kind : StoryKind) : TUrlProps {
  const { id: storyId, attachment: { __typename } } = story
  switch(__typename) {
    case 'Article':
      const path = buildPath(`/_/archive/${kind}/${storyId}`)
      return {
        native: {
          navigationBehavior: 'navigate'
        },
        routeName: 'Home',
        web: { path, as: path },
        params: {
          screen: 'RecentlyReadStories',
          params: { storyId, kind }
        }
      }
    default:
      return storyPath(story)
  }
}

export function favoriteDesktopStoryPath(story : TStory, kind : StoryKind) : TUrlProps {
  const { id: storyId, attachment: { __typename } } = story
  switch(__typename) {
    case 'Article':
      const path = buildPath(`/_/favorite/${kind}/${storyId}`)
      return {
        native: {
          navigationBehavior: 'navigate'
        },
        routeName: 'Home',
        web: { path, as: path },
        params: {
          screen: 'FavoriteStories',
          params: { storyId, kind }
        }
      }
    default:
      return storyPath(story)
  }
}

export function groupsPath() {
  const path = buildPath('/_/groups')
  return {
    routeName: 'Home',
    params: { screen: 'ListGroups' },
    web: { as: path, path: path } 
  }
}

export function newGroupPath() {
  const path = buildPath('/_/groups/new')
  return {
    routeName: 'NewGroup',
    web: { as: path, path } 
  }
}

export function editGroupPath(groupId : string) {
  const path = buildPath(`/_/groups/${groupId}/edit`)
  return {
    routeName: 'EditGroup',
    params: { groupId },
    web: { as: path, path } 
  }
}

export function groupPath(groupId : string) {
  const path = buildPath(`/_/groups/${groupId}`)
  return {
    routeName: 'Home',
    params: { screen: 'ShowGroup', params: { storyId: undefined, groupId } },
    web: { as: path, path } 
  }
}

export function groupStoryPath(groupId : string, story : TStory) {
  if (story.attachment.__typename === 'Article') {
    const path = buildPath(`/_/groups/${groupId}/${story.id}`)
    return {
      native: {
        navigationBehavior: 'navigate'
      },
      routeName: 'Home',
      params: { screen: 'ShowGroup', params: { storyId: story.id || '', groupId } },
      web: { as: path, path } 
    }
  } else {
    return storyPath(story)
  }
}


export function adminPath() {
  const path = buildPath('/_/settings')
  return {
    routeName: 'Home',
    params: { screen: 'Settings' },
    web: { as: path, path } 
  }
}

export function adminBackgroundJobsPath() {
  const path = buildPath('/_/settings/background_jobs')
  return { 
    routeName: 'BackgroundJobs',
    web: { as: path, path } 
  }
}

export function adminShowBackgroundJobsPath(jobId: number | string) {
  const path = buildPath(`/_/settings/background_jobs/${jobId}`)
  return { 
    routeName: 'ShowBackgroundJob',
    params: { jobId },
    web: { as: path, path } 
  }
}

export function adminApiExplorerPath() {
  const path = buildPath('/_/settings/explorer')
  return { 
    routeName: 'ApiExplorer',
    web: { as: path, path } 
  }
}

export const homePath = unreadStoriesPath