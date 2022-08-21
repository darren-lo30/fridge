import { extendTheme, Theme } from '@chakra-ui/react'

const themeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
  colors: {
    primary: {
      main: '#aed581',
      light: '#e1ffb1',
      dark: '#7da453'
    },
    secondary: {
      main: '#ff8a65',
      light: '#ffbb93',
      dark: '#c75b39'
    },
    background: '#eceff1',
  }
}


const theme = extendTheme({ ...themeConfig }) as Theme;

export default theme;