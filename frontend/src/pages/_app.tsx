import type { AppProps } from 'next/app'
import { authedNavLinks, nonAuthedNavLinks, profileLinks } from '@configs/navConfig';
import { Box, ChakraProvider, Heading, Text } from '@chakra-ui/react'
import Navbar from '@components/Navbar';
import {ErrorBoundary} from 'react-error-boundary'

import '@fontsource/inter';
import theme from '@configs/themeConfig';

import '@configs/themeConfig';
import { UserProvider, useUser } from '@contexts/UserProvider';
import { Bounds } from '@components/Bounds';
import { Provider } from 'react-redux';
import { store } from '@src/store';
import { MeasurementUnitProvider } from '@src/contexts/MeasurementUnitProvider';
import RouterGuard from '@src/components/RouterGuard';

import '@src/styles/editor.css';


const FridgeNavBar = () => {
  const { user }= useUser();
  return <Navbar navLinks={user ? authedNavLinks : nonAuthedNavLinks} profileLinks={profileLinks} />  
}

const ErrorFallback = ({ error} : {error: Error }) => {
  return (
    <Box my='auto'>
      <Heading>Something went wrong...</Heading>
      <Text>{ error.message }</Text>
    </Box>
  )
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <MeasurementUnitProvider>
          <UserProvider>
            <RouterGuard>
              <Box 
                display={'flex'} 
                bg={'background'} 
                minHeight={'100vh'}
                flexDir={'column'}
              > 
                <FridgeNavBar/>  
                <Bounds display={'flex'} flex={'1'} py={'8'}>
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Component {...pageProps} />    
                  </ErrorBoundary>
                </Bounds>
              </Box>
            </RouterGuard>
          </UserProvider>
        </MeasurementUnitProvider>
      </ChakraProvider>
    </Provider>
  );
}


export default MyApp
