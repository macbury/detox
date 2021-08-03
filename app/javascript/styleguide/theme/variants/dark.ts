import { Theme } from './types'

const dark : Theme = {
  insets: null,
  device: 'desktop',
  dark: true,
  font: {
    main: 'Roboto-Regular'
  },
  fontSize: {
    searchInput: '16px',
    text: '16px',
    label: '15px',
    inputText: '19px',
    buttonText: '16px'
  },
  opacity: {
    buttonClick: 0.6
  },
  audioPoster: {
    colors: {
      accent: '#fff',
      background: '#343434',
      foreground: '#1c1c1c',
    },
    blurhash: 'L02YkZj[fQj[-;fQfQfQ%MfQfQfQ'
  },
  colors: {
    navbar: '#000000',
    inactiveTab: 'rgba(255, 255, 255, 0.7)',
    buttonOutlineText: 'rgb(51, 153, 102)',
    buttonOutlineBackground: 'rgba(0,0,0,0)',
    modalBackground: '#1c1c1c',
    overlay: 'rgba(0, 0, 0, 0.4)',
    cardAction: '#fff',
    cardHeaderTitle: '#fff',
    cardHeaderSubTitle: 'rgba(255, 255, 255, 0.7)',
    cardBackgroundHover: 'rgba(255, 255, 255, 0.05)',
    cardBackground: '#1c1c1c',
    placeholder: 'rgba(255, 255, 255, 0.5)',
    statusBar: '#000000',
    navigationBar: 'rgba(0,0,0, 0.5)',
    notificationTextColor: '#fff',
    error: 'rgb(224, 36, 94)',
    buttonTextColor: '#fff',
    inputText: '#fff',
    inputBackground: 'rgba(255, 255, 255, 0.05)',
    inputBorder: 'rgba(255, 255, 255, 0.08)',
    label: 'rgba(255, 255, 255, 0.5)',
    primary: 'rgb(51, 153, 102)',
    activeHeader: 'rgba(51, 153, 102, 0.1)',
    articleBackground: '#222',
    articleTextColor: '#999',
    background: '#111111',
    card: '#1c1c1c',
    text: '#cccccc',
    border: '#343434',
    notification: 'rgb(255, 69, 58)',
  }
}

export default dark