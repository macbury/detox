import React from 'react'
import styled from 'styled-components/native'

const NotificationContainer = styled.SafeAreaView`
  position: absolute;
  bottom: ${({ theme }) => theme.device === 'desktop' ? '10px' : '0px' };
  left: ${({ theme }) => theme.device === 'desktop' ? '10px' : '0px' };
  border-radius: ${({ theme }) => theme.device === 'desktop' ? '10px' : '0px' };
  width: ${({ theme }) => theme.device === 'desktop' ? 'auto' : '100%' };
  min-width: 300px;
  background: ${({ theme }) => theme.colors.primary};
  padding-bottom: ${({ theme }) => theme.insets.bottom}px;
`

const MessageText = styled.Text`
  padding: 15px 25px;
  color: ${({ theme }) => theme.colors.notificationTextColor};
  font-family: ${({ theme }) => theme.font.main};
`

export interface INotification {
  message: string
  retryAction?()
}

export interface INotificationsProps {
  notification: INotification
}

/**
 * Display notifications
 */
export default function Notifications({ notification } : INotificationsProps) {
  if (!notification) {
    return null
  }

  return (
    <NotificationContainer>
      <MessageText>{notification.message}</MessageText>
    </NotificationContainer>
  )
}