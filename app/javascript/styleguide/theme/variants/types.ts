import OS, { ServerType } from '@detox/shared/os'
import { EdgeInsets } from 'react-native-safe-area-context'

export type Device = 'desktop' | 'mobile'
export type Orientation = 'landscape' | 'portrait'

export type Theme = {
  insets: EdgeInsets;
  device?: Device;
  os?: ServerType;
  orientation?: Orientation;
  dark: boolean;
  audioPoster: {
    colors: {
      accent: string
      background: string
      foreground: string
    },
    blurhash: string
  },
  font: {
    main: string
  },
  fontSize: {
    searchInput: string;
    text: string;
    label: string;
    inputText: string;
    buttonText: string;
  },
  opacity: {
    buttonClick: number;
  },
  colors: {
    inactiveTab: string;
    buttonOutlineBackground: string;
    buttonOutlineText: string;
    modalBackground: string;
    overlay: string;
    card: string;
    articleBackground: string;
    articleTextColor: string;
    cardBackground: string;
    cardBackgroundHover: string;
    cardHeaderTitle: string;
    cardHeaderSubTitle: string;
    cardAction: string;
    placeholder: string;
    navigationBar: string;
    navbar: string;
    statusBar: string;
    notificationTextColor: string;
    error: string;
    label: string;
    buttonTextColor: string;
    inputText: string;
    inputBackground: string;
    inputBorder: string;
    primary: string;
    activeHeader: string;
    background: string;
    text: string;
    border: string;
    notification: string;
  };
}
