import React from 'react'
import { useTranslation } from 'react-i18next'
import { channelsPath, recentlyReadStoriesPath, unreadStoriesPath, adminPath, groupsPath, favoriteStoriesPath } from "@detox/shared";
import DrawerLink from './DrawerLink';

export interface IUserNavigationProps {
  selectedRouteName: string
  collapsed?: boolean
  unreadStoriesCount?: string
}

export default function UserNavigationItems({ unreadStoriesCount, selectedRouteName, collapsed } : IUserNavigationProps) {
  const { t } = useTranslation()
  return (
    <React.Fragment>
      <DrawerLink
        title={t('drawer.UnreadStories')}
        collapsed={collapsed}
        bubble={unreadStoriesCount}
        selected={selectedRouteName === 'UnreadStories'} 
        to={unreadStoriesPath()} 
        icon="newspaper">
          {t('drawer.UnreadStories')}
      </DrawerLink>
      <DrawerLink
        title={t('drawer.RecentlyReadStories')}
        collapsed={collapsed}
        selected={selectedRouteName === 'RecentlyReadStories'} 
        to={recentlyReadStoriesPath()} 
        icon="history">
          {t('drawer.RecentlyReadStories')}
      </DrawerLink>
      <DrawerLink
        title={t('drawer.FavoriteStories')}
        collapsed={collapsed}
        selected={selectedRouteName === 'FavoriteStories'} 
        to={favoriteStoriesPath()} 
        icon="cards-heart">
          {t('drawer.FavoriteStories')}
      </DrawerLink>
      <DrawerLink
        title={t('drawer.ListChannels')}
        collapsed={collapsed}
        selected={selectedRouteName === 'ListChannels'}
        to={channelsPath()}
        icon="palette-swatch">
          {t('drawer.ListChannels')}
      </DrawerLink>
      <DrawerLink
        title={t('drawer.ListGroups')}
        collapsed={collapsed}
        selected={selectedRouteName === 'ListGroups'}
        to={groupsPath()}
        icon="folder-pound">
          {t('drawer.ListGroups')}
      </DrawerLink>
      <DrawerLink
        title={t('drawer.Settings')}
        collapsed={collapsed}
        selected={selectedRouteName === 'Settings'}
        to={adminPath()}
        icon="cog">
          {t('drawer.Settings')}
      </DrawerLink>
    </React.Fragment>
  )
}