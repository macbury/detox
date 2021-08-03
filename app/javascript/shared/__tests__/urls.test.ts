import { StoryKind } from '@detox/api'
import { unreadDesktopStoryPath, unreadStoriesPath, homePath, recentlyReadStoriesPath, archiveDesktopStoryPath } from '../urls'

it('unreadStoriesPath', () => {
  expect(unreadStoriesPath()).toEqual({
    "params": {
      "screen": "UnreadStories",
      "params": {
        "storyId": '',
        "channelId": undefined
      }
    },
    "routeName": "Home",
    "web": {
      "as": "/_/unread/All?",
      "path": "/_/unread/All?"
    }
  })
})

it('recentlyReadStoriesPath', () => {
  expect(recentlyReadStoriesPath()).toEqual({
    "params": {
      "screen": "RecentlyReadStories",
      "params": {
        "storyId": '',
        'channelId': undefined
      },
    },
    "routeName": "Home",
    "web": {
      "as": "/_/archive/All?",
      "path": "/_/archive/All?"
    }
  })
})

it('unreadDesktopStoryPath', () => {
  expect(unreadDesktopStoryPath({ id: 'abcd', attachment: { __typename: 'Article' } } as any, StoryKind.All)).toEqual({
    "params": {
      "kind": "All",
      "storyId": "abcd"
    },
    "routeName": "UnreadStories",
    "web": {
      "as": "/_/unread/All/abcd",
      "path": "/_/unread/All/abcd"
    }
  })
})

it('unreadDesktopStoryPath', () => {
  expect(archiveDesktopStoryPath({ id: 'abcd', attachment: { __typename: 'Article' } } as any, StoryKind.All)).toEqual({
    "params": {
      "kind": "All",
      "storyId": "abcd"
    },
    "routeName": "RecentlyReadStories",
    "web": {
      "as": "/_/archive/All/abcd",
      "path": "/_/archive/All/abcd"
    }
  })
})


it('homePath is unreadStoriesPath', () => {
  expect(homePath()).toEqual(unreadStoriesPath())
})