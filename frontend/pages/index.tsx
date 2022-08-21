import { Flex, Box, Image, Text, Heading, Stack, Link, ButtonGroup, LinkProps} from '@chakra-ui/react'
import Logo from '@components/Logo'
import { useUser } from '@contexts/UserProvider'
import type { NextPage } from 'next'

const AuthButton = (props : LinkProps) => (
  <Link
    bg={'primary.main'}
    rounded={'5'}
    py={'2'}
    px={'5'}
    display={'flex'}
    _hover={{
      textDecoration: 'none',
      bg: 'secondary.main'
    }}
    fontWeight={'bold'}
    { ...props }
  > { props.children } </Link>
)

const AuthedView = () => {
  return (
    <>
    </>
  );
}

const UnauthedView = () => (
  <Flex flex={'1'} justifyContent={'stretch'} alignItems={'stretch'}>
    <Box flex={'2'} height={'100%'}>
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
    <Box rounded='5' flex='1' height='80%' my='auto'>
      <Image src='/landing.svg' height={'100%'} alt='Vector of fridge'/>
    </Box>
  </Flex>  
)

const Home: NextPage = () => {
  const { user } = useUser();

  if(user) {
    return (<AuthedView />);
  } else {
    return (<UnauthedView />);
  }
  
}

export default Home
