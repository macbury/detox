import React, { useState, useMemo } from 'react'
import { TouchableOpacity } from 'react-native'
import styled, { useTheme, DefaultTheme } from 'styled-components/native'
import MaterialIcon from '@expo/vector-icons/MaterialIcons'
import { useEffect } from 'react'

export interface ISearchFieldProps {
  editable?: boolean
  className?: any
  style?: any
  loading?: boolean
  value?: string
  placeholder?: string,
  onFocusChange?(focused: boolean)
  onChangeText(newValue: string)
}

export interface IStyleProps {
  focused?: boolean;
  editable?: boolean
  theme?: DefaultTheme
}

const RightIcon = styled(MaterialIcon)`
  margin-right: 15px;
`

const LeftContainer = styled.View`
  margin-left: 15px;
  margin-right: 15px;
  width: 24px;
`

const LeftIcon = styled(MaterialIcon)`

`

const LoadingIndicator = styled.ActivityIndicator`
  
`

const SearchFieldContainer = styled.View`
  background: ${({ theme }) => theme.colors.inputBackground};
  border-radius: 10px;
  border-width: 1px;
  border-color: ${({ theme, focused } : IStyleProps) => focused ? theme.colors.primary : theme.colors.border};
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 40px;
  opacity: ${({ editable } : IStyleProps) => editable ? 1.0 : 0.4};
`

const TextInput = styled.TextInput`
  padding: ${({ theme }) => theme.device === 'desktop' ? '10px 20px 10px 0px' : '5px 10px 5px 0px'};
  color: ${({ theme }) => theme.colors.inputText};
  font-size: ${({ theme }) => theme.fontSize.searchInput};
  font-family: ${({ theme }) => theme.font.main};
  flex: 1;
`

export default function SearchField(props : ISearchFieldProps) {
  const theme = useTheme()
  const [isFocused, setFocused] = useState(false)

  const {
    loading,
    placeholder,
    value,
    editable = true,
    onFocusChange,
    onChangeText,
    ...inputProps
  } = props

  const activeColor = useMemo(() => (isFocused ? theme.colors.primary : theme.colors.label), [isFocused, theme])

  useEffect(() => {
    onFocusChange && onFocusChange(isFocused)
  }, [onFocusChange, isFocused])

  return (
    <SearchFieldContainer {...inputProps} focused={isFocused} editable={editable}>
      <LeftContainer>
        {loading ? <LoadingIndicator size={20} color={activeColor} /> : <LeftIcon name="search" color={activeColor} size={24} />}
      </LeftContainer>
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={value}
        editable={editable}
        autoCapitalize="none"
        onChangeText={onChangeText}
        placeholderTextColor={theme.colors.placeholder}
        placeholder={placeholder} />
      
      {
        value?.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <RightIcon name="close" color={activeColor} size={24} />
        </TouchableOpacity>)
      }
    </SearchFieldContainer>
  )
}