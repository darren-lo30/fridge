import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const themeConfig: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}


const theme = extendTheme({ themeConfig });

export { theme, themeConfig };