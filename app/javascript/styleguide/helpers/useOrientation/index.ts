import { useMediaQuery } from 'react-responsive'

export function useIsPortrait() {
  return useMediaQuery({ query: '(orientation: portrait)' })
}