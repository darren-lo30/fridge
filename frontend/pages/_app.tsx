import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { authedNavLinks } from 'configs/navConfig';
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from '@components/navbar';

import 'configs/themeConfig';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Navbar navLinks={authedNavLinks}>
        <Component {...pageProps} />      
      </Navbar>
    </ChakraProvider>
  );
}

export default MyApp
