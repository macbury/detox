import { DefaultTheme } from 'styled-components/native'
import { StackNavigationOptions } from '@react-navigation/stack';

export type TGetScreenOptions = (t : (key : string) => string, mobile : boolean, theme : DefaultTheme) => StackNavigationOptions