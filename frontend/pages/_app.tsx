import type { AppProps } from 'next/app'
import { authedNavLinks } from 'configs/navConfig';
import { Box, ChakraProvider } from '@chakra-ui/react'
import Navbar from '@components/Navbar';

import '@fontsource/inter';
import theme from '@configs/themeConfig';

import 'configs/themeConfig';
import { UserProvider, useUser } from '@contexts/UserProvider';
import { Bounds } from '@components/Bounds';
import { useEffect } from 'react';
import UserAPI from '@apiLayer/UserAPI';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Box 
          display={'flex'} 
          bg={'background'} 
          minHeight={'100vh'}
          flexDir={'column'}
        > 
          <Navbar navLinks={authedNavLinks} />  
          <Bounds display={'flex'} flex={'1'} py={'8'}>
            <Component {...pageProps} />    
          </Bounds>
        </Box>
      </UserProvider>
    </ChakraProvider>
  );
}


export default MyApp
