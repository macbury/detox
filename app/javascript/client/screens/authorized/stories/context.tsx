import { createContext, useContext } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'

export type TStackNavigationProp = StackNavigationProp<any, any>

export const StackNavigationContext = createContext<TStackNavigationProp>(null)

/**
 * Get stack navigator from inside tab navigation. Use this for updating header
 */
export function useStackNavigation() {
  return useContext(StackNavigationContext)
}