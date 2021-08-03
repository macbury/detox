import React from 'react'
import color from 'color'
import { createGlobalStyle } from 'styled-components'
import { useTheme } from 'styled-components/native'

const ScrollBarsStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => color(theme.colors.primary).fade(0.5)};
    border: 0px none;
    border-radius: 0px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => color(theme.colors.primary).fade(0.06)};
  }

  ::-webkit-scrollbar-thumb:active {
    background: ${({ theme }) => color(theme.colors.primary).lighten(0.04)};
  }

  ::-webkit-scrollbar-track {
    border: 0px;
    border-radius: 0;
    border-left: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => color(theme.colors.card).darken(0.1)};
  }

  ::-webkit-scrollbar-track:hover {
    background: ${({ theme }) => color(theme.colors.card).darken(0.2)};
  }

  ::-webkit-scrollbar-track:active {
    background: ${({ theme }) => color(theme.colors.card).darken(0.25)};
  }

  ::-webkit-scrollbar-corner {
    background: transparent;
  }
`

/**
 * Set browser scrollbar style
 */
export default function Scrollbar() {
  const theme = useTheme()

  return <ScrollBarsStyle theme={theme} />
}
