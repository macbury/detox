import ScreenOrientation from "react-native-orientation-locker";

export function useIsPortrait() {
  return ScreenOrientation.getInitialOrientation() === 'PORTRAIT'
}