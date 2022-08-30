import { Flex, Box, Image, Text, Heading, Stack, ButtonGroup, LinkProps} from '@chakra-ui/react'
import { FridgeLink } from '@components/forms/FridgeButton'
import RecipeList from '@src/components/RecipeList'
import { StoredUser, useUser } from '@contexts/UserProvider'
import type { NextPage } from 'next'
import { motion } from 'framer-motion';
import FridgeDisplay from '@src/components/FridgeDisplay'

const AuthButton = (props : LinkProps) => (
  <FridgeLink
    py={'2'}
    px={'5'}
    fontWeight={'bold'}
    { ...props }
  > { props.children } </FridgeLink>
)

const AuthedView = ({ user } : { user: StoredUser }) => {
  return (
    <Flex flex={'1'} justifyContent={'stretch'} alignItems={'stretch'} gap={'3rem'}>
      <Box flex={'4'} p={'5'} rounded={'5'}>
        <Heading size='lg'>
          Recipes For Me
        </Heading>
        <RecipeList indexType='tailored'/>
      </Box>
      
      <Box bg='gray.50' height='80%' maxHeight='600px'>
        <FridgeDisplay boxShadow='md' display='flex' flexDir='column' flex={'1'} p={'5'} rounded={'5'} height='100%' fridgeId={user.fridgeId} />          
      </Box>
    </Flex>
  );
}

const UnauthedView = () => (
  <Flex flex={'1'} justifyContent={'stretch'} alignItems={'stretch'} overflow='hidden' >
    <Box as={motion.div} flex={'2'} height={'100%'}
      initial={{x: '-100vw', opacity: 1, scale: 1}}
      animate={{x: 0, opacity: 1, scale: 1}} 
      transition='0.5s ease-out'
    >
      <Stack pl={'3'} pr={'5rem'} pt={'20vh'}>
        <Heading
          size={'3xl'}
          mb={'3'}
          display={'inline'}
          lineHeight={'120%'}
        >
          Unlock the Full Potential of Your 
          <Heading
            size={'3xl'}
            as='span'
            fontWeight={'bold'}
            color={'primary.800'}
          >
            {' Fridge'} 
          </Heading>
        </Heading>
        <Text
          fontSize={'lg'}
          pr={'25%'}
        >
          Access your <Text as='span' color='primary.800' fontWeight={'bold'}>Fridge</Text> from anywhere. Find tailored recipes made with the ingredients in your <Text as='span' color='primary.800' fontWeight={'bold'}>Fridge</Text>.
        </Text>
        <ButtonGroup py={'4'} gap={'3'}>
          <AuthButton href={'/sign-in'}>Sign In</AuthButton>
          <AuthButton href={'/sign-up'}>Sign Up</AuthButton>
        </ButtonGroup>
      </Stack>
    </Box>
    <Box 
      rounded='5' flex='1' height='80%' my='auto'
      as={motion.div} 
      initial={{y: '100vh', opacity: 1, scale: 1}}
      animate={{y: 0, opacity: 1, scale: 1}} 
      transition='0.5s ease-out'
    >
      <Image src='/landing.svg' height={'100%'} alt='Vector of fridge'/>
    </Box>
  </Flex>  
)

const Home: NextPage = () => {
  const { user } = useUser();

  if(user) {
    return (<AuthedView user={user}/>);
  } else {
    return (<UnauthedView />);
  }
  
}

export default Home
