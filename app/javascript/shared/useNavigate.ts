import { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TUrlProps } from './types/urls'

/**
 * Wrapper around navigation to support TUrlProps links
 */
export function useNavigate() {
  const navigation = useNavigation()

  const navigate = useCallback((to : TUrlProps) => {
    navigation.navigate(to.routeName, to.params)
  }, [navigation])

  return {
    nativeNavigation: navigation.navigate,
    ...navigation,
    navigate
  }
}