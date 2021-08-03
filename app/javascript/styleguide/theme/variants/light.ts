import { Theme } from './types'

const light : Theme = {
  insets: null,
  device: 'desktop',
  dark: false,
  font: {
    main: 'Roboto-Regular'
  },
  fontSize: {
    text: '16px',
    label: '15px',
    searchInput: '16px',
    inputText: '19px',
    buttonText: '16px'
  },
  opacity: {
    buttonClick: 0.6
  },
  audioPoster: {
    colors: {
      accent: '#555',
      background: '#ffffff',
      foreground: '#1c1c1c',
    },
    blurhash: 'L1SY{qD%00_300?b?bM{00xu-;of'
  },
  colors: {
    navbar: '#F2F2F2',
    inactiveTab: 'rgba(0, 0, 0, 0.3)',
    buttonOutlineText: 'rgb(51, 153, 102)',
    buttonOutlineBackground: 'rgba(0,0,0,0)',
    modalBackground: '#ffffff',
    overlay: 'rgba(255, 255, 255, 0.7)',
    cardAction: 'rgba(0, 0, 0, 0.54)',
    cardBackgroundHover: 'rgba(0, 0, 0, 0.03)',
    cardHeaderTitle: 'rgba(0, 0, 0, 0.87)',
    cardHeaderSubTitle: 'rgba(0, 0, 0, 0.54)',
    placeholder: 'rgba(0, 0, 0, 0.3)',
    statusBar: '#f2f2f2',
    navigationBar: 'rgba(0,0,0, 0.3)',
    notificationTextColor: '#fff',
    error: 'rgb(224, 36, 94)',
    buttonTextColor: '#fff',
    inputText: '#333',
    inputBackground: 'rgba(0, 0, 0, 0.05)',
    inputBorder: 'rgba(0, 0, 0, 0.08)',
    label: 'rgba(0, 0, 0, 0.5)',
    primary: 'rgb(51, 153, 102)',
    activeHeader: 'rgba(51, 153, 102, 0.1)',
    background: '#F2F2F2',
    articleBackground: '#F2F2F2',
    articleTextColor: '#555',
    card: '#ffffff',
    cardBackground: '#ffffff',
    text: '#555',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  }
}

export default light