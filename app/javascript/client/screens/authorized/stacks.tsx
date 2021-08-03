import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

export const UsersStack = createStackNavigator()
export const RootStack = createStackNavigator()
export const AdminStack = createStackNavigator()
export const HomeStack = createStackNavigator()
export const AdminBackgroundJobsTab = createMaterialTopTabNavigator()
export const Drawer = createDrawerNavigator()