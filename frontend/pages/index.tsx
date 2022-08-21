import RecipeAPI from '@apiLayer/RecipeAPI'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, Box, Image, Text, Heading, Stack, ButtonGroup, LinkProps, ScaleFade, SimpleGrid} from '@chakra-ui/react'
import { FridgeButton, FridgeLink } from '@components/FridgeButton'
import RecipePreview from '@components/RecipePreview'
import { useUser } from '@contexts/UserProvider'
import { Recipe } from '@fridgeTypes/Recipe'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

const AuthButton = (props : LinkProps) => (
  <FridgeLink
    py={'2'}
    px={'5'}
    fontWeight={'bold'}
    { ...props }
  > { props.children } </FridgeLink>
)

const AuthedView = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const getRecipes = async () => {
    const recipes = await RecipeAPI.getTailoredRecipes({limit: 8});
    setRecipes([
      {
        author: {
          email: 'Test@gmail.com',
          fullName: 'Darren Lo',
          id: '123123'
        },
        description: 'hello world this is a descript. Very tasty',
        id: 'asddas',
        ingredients: [],
        instructions: 'asdasdsd',
        postedDate: new Date(),
        thumbnail: 'https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image-300x225.png',
        title: 'Number 1 Pizza Recipe'
      },
      {
        author: {
          email: 'Test@gmail.com',
          fullName: 'Darren Lo',
          id: '123123'
        },
        description: 'hello world this is a descript. Very tasty',
        id: 'asddas',
        ingredients: [],
        instructions: 'asdasdsd',
        postedDate: new Date(),
        thumbnail: 'https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image-300x225.png',
        title: 'Number 1 Pizza Recipe'
      },
      {
        author: {
          email: 'Test@gmail.com',
          fullName: 'Darren Lo',
          id: '123123'
        },
        description: 'hello world this is a descript. Very tasty. Stop showing this overflowing line',
        id: 'asddas',
        ingredients: [],
        instructions: 'asdasdsd',
        postedDate: new Date(),
        thumbnail: 'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Pizza-from-Scratch_EXPS_FT20_8621_F_0505_1_home.jpg',
        title: 'Number 1 Pizza Recipe',
      }
    ]);
  }

  useEffect(() => {
    void getRecipes();
  }, []);

  return (
    <Flex flex={'1'} justifyContent={'stretch'} alignItems={'stretch'} gap={'3rem'}>
      <Box flex={'2'} p={'5'} rounded={'5'}>
        <Heading size='lg'>
          Recipes For You
        </Heading>
        <SimpleGrid mt={'5'} pt={'5'} columns={2} minChildWidth='300px' overflow={'hidden'} gap={'5'}>
          { recipes.map((recipe) => (
            <RecipePreview bg={'white'} key={recipe.id} recipe={recipe} ></RecipePreview>
          ))}
        </SimpleGrid>
        <Box textAlign={'center'} mt='5'>
          <FridgeButton slideDirection='bottom'>
            <ChevronDownIcon w='10' h='10' />
          </FridgeButton>
        </Box>
      </Box>
      <Box flex={'1'} p={'5'} rounded={'5'} bg={'gray.50'}>
        <Heading size='lg'>
          Your Fridge
        </Heading>
      </Box>
    </Flex>
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
    
    <ScaleFade initialScale={0.5} in={true}>
      <Box rounded='5' flex='1' height='80%' my='auto'>
        <Image src='/landing.svg' height={'100%'} alt='Vector of fridge'/>
      </Box>
    </ScaleFade>
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
