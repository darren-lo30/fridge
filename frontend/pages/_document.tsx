import { Html, Head, Main, NextScript } from 'next/document'
import theme from '@configs/themeConfig'
import { ColorModeScript } from '@chakra-ui/react';

const Document = () => {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;