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
      "main": '#aed581',
      "50": "#f1f8e9",
      "100": "#dcedc8",
      "200": "#c5e1a5",
      "300": "#aed581",
      "400": "#9ccc65",
      "500": "#8bc34a",
      "600": "#7cb342",
      "700": "#689f38",
      "800": "#558b2f",
      "900": "#33691e",
      "a100": "#ccff90",
      "a200": "#b2ff59",
      "a400": "#76ff03",
      "a700": "#64dd17"
    },


    secondary: {
      main: '#ff8a65',
      light: '#ffbb93',
      dark: '#c75b39'
    },
    background: '#eceff1',
  },
  shadows: {
    outline: 'red',
  }
}


const theme = extendTheme({ ...themeConfig }) as Theme;
export default theme;