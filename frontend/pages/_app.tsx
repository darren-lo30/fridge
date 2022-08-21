import type { AppProps } from 'next/app'
import { authedNavLinks, nonAuthedNavLinks, profileLinks } from 'configs/navConfig';
import { Box, ChakraProvider } from '@chakra-ui/react'
import Navbar from '@components/Navbar';

import '@fontsource/inter';
import theme from '@configs/themeConfig';

import 'configs/themeConfig';
import { UserProvider, useUser } from '@contexts/UserProvider';
import { Bounds } from '@components/Bounds';

const FridgeNavBar = () => {
  const { user }= useUser();
  return <Navbar navLinks={user ? authedNavLinks : nonAuthedNavLinks} profileLinks={profileLinks} />  
}

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
          <FridgeNavBar/>  
          <Bounds display={'flex'} flex={'1'} py={'8'}>
            <Component {...pageProps} />    
          </Bounds>
        </Box>
      </UserProvider>
    </ChakraProvider>
  );
}


export default MyApp
