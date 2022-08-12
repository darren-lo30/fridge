import { Html, Head, Main, NextScript } from 'next/document'
import {themeConfig} from 'configs/themeConfig'
import { ColorModeScript } from '@chakra-ui/react';

const Document = () => {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <ColorModeScript initialColorMode={themeConfig.initialColorMode} />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;