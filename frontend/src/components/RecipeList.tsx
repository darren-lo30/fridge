import RecipeAPI from "src/apiLayer/RecipeAPI";
import { Box, Heading,Flex, Text, Image, BoxProps, SimpleGrid } from "@chakra-ui/react"
import { Recipe } from "@fridgeTypes/Recipe";
import { AnimatePresence, motion } from 'framer-motion'

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FridgeLink} from "./forms/FridgeButton";
import FridgeSpinner from "./FridgeSpinner";
import { PaginationParams } from "@fridgeTypes/API";
import { useUser } from "@src/contexts/UserProvider";

const RecipePreview = ({ recipe, ...props} : { recipe: Recipe} & BoxProps) => {
  return (
    <Box {...props} rounded={'5'} transition='all 0.3s ease-out' _hover={{
      transform: 'translateY(-10px)'
      
    }}>
      <Image roundedTop={'5'} width='100%' height={'250px'} objectFit={'cover'} src={recipe.thumbnail} alt='Recipe thumbnail' />
      <Box rounded={'5'} padding={'5'}>
        <Flex direction='column'>
          <Heading size={'lg'}>
            {recipe.title}
          </Heading>
          <Text mt={'0.5'} fontSize={'sm'} color={'gray.500'}>
            By { recipe.author.fullName }
          </Text>
          <Text py={'3'} overflow={'hidden'} textOverflow={'ellipsis'} noOfLines={2}>
            { recipe.description }
          </Text>
          <FridgeLink mt={'3'} href={`/recipes/${recipe.id}`} alignSelf={'start'}>
            View Recipe
          </FridgeLink>
        </Flex>
      </Box>
    </Box>
  );
}


interface RecipeListProps {
  indexType: 'tailored' | 'all' | 'authored',
}

const RecipeList = ({ indexType } : RecipeListProps ) => {
  const { user } = useUser();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [hasMore, setHasMore] = useState(true);
  
  const getRecipes = async () => {
    const limit = 4;
    const paginationParams : PaginationParams = { 
      limit, 
      cursor: recipes.length > 0 ? recipes[recipes.length - 1].id : undefined,
      offset: recipes.length > 0 ? 1 : 0,
    };

    let newRecipes : Recipe[];
    
    if(indexType === 'tailored') {
      newRecipes = await RecipeAPI.indexTailoredRecipes(paginationParams);
    } else if(indexType === 'all') {
      newRecipes = await RecipeAPI.indexAllRecipes(paginationParams);
    } else {
      if(!user){ 
        throw new Error('User must be authenticated to view their recipes.');
      }

      newRecipes = await RecipeAPI.indexUserRecipes(user.id, paginationParams);
    }

    if(newRecipes.length < limit) {
      setHasMore(false);
    }

    setRecipes([ ...recipes, ...newRecipes ]);
  };

  useEffect(() => {
    void getRecipes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Box>
      <InfiniteScroll style={{ overflow: 'hidden'}} next={getRecipes} loader={<FridgeSpinner containerProps={{py: 7}} />} dataLength={recipes.length} hasMore={hasMore}>
        <SimpleGrid mt={'5'} pt={'5'} columns={2} minChildWidth='300px' gap={'5'} overflow={'hidden'}>
            { recipes.map((recipe) => (
              <AnimatePresence key={recipe.id} >
                <Box 
                  key={recipe.id}
                  as={motion.div}
                  initial={{y: '50%', opacity: 0, scale: 1}}
                  animate={{y: 0, opacity: 1, scale: 1}}
                  transition='1s ease-out'
                >
                  <RecipePreview bg={'white'} recipe={recipe}></RecipePreview>
                </Box>
              </AnimatePresence>
            ))}
        </SimpleGrid>
      </InfiniteScroll>
    </Box>
  )
  
}

export default RecipeList;