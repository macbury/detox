import React, { useCallback } from 'react'
import styled, { useTheme, DefaultTheme } from 'styled-components/native'
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons'
import ChannelIcon from '../Channel/ChannelIcon'
import Text from '../form/Text'
import Touchable from '../form/Touchable'
import GroupOption from '@detox/store/models/GroupOption'

interface IButtonProps {
  disabled?: boolean;
}

const Button = styled(Touchable)`
  flex: 1;
  padding: 10px;
  overflow: hidden;
  border-radius: 4px;
  opacity: ${({ disabled } : IButtonProps) => disabled ? 0.5 : 1.0};
`

const Wrapper = styled.View`
  height: 100px;
  overflow: hidden;
  border-radius: 4px;
`

interface ISelectedProps {
  selected?: boolean
  theme?: DefaultTheme
}

const IconAndTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: ${({ selected } : ISelectedProps) => selected ? 0.3 : 1.0};
`

const Title = styled(Text)`
  margin-top: 10px;
  font-size: 11px;
`

const SelectedContainer = styled.View`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: ${({ theme }) => theme.colors.inputBackground};
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Icon = styled(MaterialIcon)`

`

export interface ISubscriptionItemProps {
  option: GroupOption
  editable?: boolean
}

export default function SubscriptionItem({ option, editable } : ISubscriptionItemProps) {
  const theme = useTheme()

  return (
    <Button onPress={option.toggle} disabled={!editable}>
      <Wrapper>
        <IconAndTextContainer selected={option.selected}>
          <ChannelIcon large channel={option.channel} />
          <Title numberOfLines={1}>{option.channel.name}</Title>
        </IconAndTextContainer>
        {option.selected && <SelectedContainer>
          <Icon name="check" size={48} color={theme.colors.text} />
        </SelectedContainer>}
      </Wrapper>
    </Button>
  )
}

export function useRenderSubscriptionItem(editable : boolean = true) {
  return useCallback(({ item }) => (
    <SubscriptionItem option={item} editable={editable} />
  ), [editable])
}