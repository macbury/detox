import 'styled-components'
import 'styled-components/native'

import { Theme } from './theme/variants'

type AppTheme = Theme

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}

declare module 'styled-components/native' {
  export interface DefaultTheme extends AppTheme {}
}
