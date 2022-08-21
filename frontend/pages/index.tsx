import { Flex, Box, Text, Heading, Stack, Link, ButtonGroup, LinkProps} from '@chakra-ui/react'
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
  
  <Flex flex={'1'} minHeight={'100%'} justifyContent={'stretch'} alignItems={'stretch'}>
    <Box flex={'1'} height={'100%'}>
      <Stack px={'3'} pt={'20rem'}>
        <Heading
          size={'3xl'}
          mb={'3'}
        >
          Hello World
        </Heading>
        <Text
          fontSize={'lg'}
        >
          Lorem Ipsum
        </Text>
        <ButtonGroup py={'4'} gap={'3'}>
          <AuthButton href={'/sign-in'}>Sign In</AuthButton>
          <AuthButton href={'/sign-up'}>Sign Up</AuthButton>
        </ButtonGroup>
      </Stack>
    </Box>
    <Box flex={'1'} height={'100%'} bg={'yellow'}>
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
