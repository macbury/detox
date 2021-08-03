import React from 'react'
import styled from 'styled-components/native'
import { Header2, Header4 } from '../form/Text'

export interface IErrorMessageContentProps {
  message: string
  index?: number
  style: any
}

const EMOJIS = [
  '(╯°□°）╯︵ ┻━┻',
  '(┛◉Д◉)┛彡┻━┻',
  '(ﾉ≧∇≦)ﾉ ﾐ ┸━┸',
  '(ノಠ益ಠ)ノ彡┻━┻',
  '(╯ರ ~ ರ）╯︵ ┻━┻',
  '(┛ಸ_ಸ)┛彡┻━┻',
  '(ﾉ´･ω･)ﾉ ﾐ ┸━┸',
  '(ノಥ,_｣ಥ)ノ彡┻━┻',
  '(┛✧Д✧))┛彡┻━┻',
  'ﾐ┻┻(ﾉ>｡<)ﾉ'
]

const ErrorContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px 20px;
`

const Description = styled(Header4)`
  text-align: center;
  margin-top: 10px;
`

/**
 * Display centered error message with random table flip emoji
 */
export default function ErrorMessageContent({ message, index, ...props } : IErrorMessageContentProps) {
  const nextIndex = index || Math.floor(EMOJIS.length * Math.random())
  const emoji = EMOJIS[nextIndex]

  return (
    <ErrorContainer {...props}>
      <Header2>{emoji}</Header2>
      <Description>{message}</Description>
    </ErrorContainer>
  )
}