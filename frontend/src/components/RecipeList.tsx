import RecipeAPI from "src/apiLayer/RecipeAPI";
import { Box, Heading,Flex, Text, Image, BoxProps, SimpleGrid, IconButton, HStack, Link } from "@chakra-ui/react"
import { Recipe } from "@fridgeTypes/Recipe";
import { AnimatePresence, motion } from 'framer-motion'

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FridgeLink} from "./forms/FridgeButton";
import FridgeSpinner from "@components/ui/FridgeSpinner";
import { PaginationParams } from "@fridgeTypes/API";
import { useUser } from "@src/contexts/UserProvider";
import { RiPencilLine, RiDeleteBin2Line } from "react-icons/ri";
import { filterUnique } from "@src/utils/fridge";

interface RecipePreviewProps extends BoxProps {
  recipe: Recipe,
  isOwned?: boolean,
  deleteRecipe?: (recipeId: string) => Promise<void>,
}
const RecipePreview = ({ recipe, isOwned = false, deleteRecipe, ...props} : RecipePreviewProps) => {

  return (
    <Box {...props} rounded={'5'} transition='all 0.3s ease-out' _hover={{
      transform: 'translateY(-10px)'
      
    }}>
      <Image roundedTop={'5'} width='100%' height={'250px'} objectFit={'cover'} src={recipe.thumbnail || '/placeholder.svg'} alt='Recipe thumbnail' />
      <Box rounded={'5'} padding={'5'}>
        <Flex direction='column'>
          <Heading size={'lg'}>
            {recipe.title} { !recipe.published && (<i>(Draft)</i>) }
          </Heading>
          <Text mt={'0.5'} fontSize={'sm'} color={'gray.500'}>
            By { recipe.author.fullName }
          </Text>
          <Text my={'3'} overflow={'hidden'} textOverflow={'ellipsis'} noOfLines={2}>
            { recipe.description }
          </Text>
          <HStack alignItems={'center'}>

            <FridgeLink py='2' href={`/recipes/${recipe.id}`} >
              View Recipe
            </FridgeLink>

            {
              isOwned && deleteRecipe && (
                <>
                  <Link href={`/recipes/${recipe.id}/edit`} p='2'>
                    <IconButton 
                      icon={<RiPencilLine />} 
                      aria-label={"Edit Recipe"} 
                      bg='primary.300'
                      _hover={{
                        background: 'primary.400'
                      }}
                      _active={{
                        background: 'primary.500'
                      }}
                    />
                  </Link>
                  <IconButton 
                    icon={<RiDeleteBin2Line />} 
                    aria-label={"Delete recipe"} 
                    bg='red.300'
                    _hover={{
                      background: 'red.400'
                    }}
                    _active={{
                      background: 'red.500'
                    }}
                    onClick={() => { void deleteRecipe(recipe.id) }}
                  />
                </>
              )
            }
          </HStack>
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

  const deleteRecipe = async (recipeId: string) => {
    await RecipeAPI.deleteRecipe(recipeId);
    setRecipes([...recipes.filter((recipe) => recipe.id !== recipeId)]);
  }

  // Ensure that the recipes always fill up screen length
  useEffect(() => {
    if(recipes.length < 6 && hasMore) {
      void getRecipes();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes]);
  
  const getRecipes = async () => {
    const limit = 6;
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

    setRecipes(filterUnique([ ...recipes, ...newRecipes ]));
  };

  useEffect(() => {
    void getRecipes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Box>
      <InfiniteScroll style={{ overflow: 'hidden'}} next={getRecipes} loader={<FridgeSpinner containerProps={{py: 7}} />} dataLength={recipes.length} hasMore={hasMore}>
        <SimpleGrid mt={'5'} pt={'5'} columns={{ base: 1, sm: 2, md: 3}} gap={'5'} overflow={'hidden'}>
            { recipes.map((recipe) => (
              <AnimatePresence key={recipe.id} >
                <Box 
                  key={recipe.id}
                  as={motion.div}
                  initial={{y: '50%', opacity: 0, scale: 1}}
                  animate={{y: 0, opacity: 1, scale: 1}}
                  transition='1s ease-out'
                >
                  <RecipePreview bg={'white'} recipe={recipe} isOwned={indexType === 'authored'} deleteRecipe={deleteRecipe}></RecipePreview>
                </Box>
              </AnimatePresence>
            ))}
        </SimpleGrid>
      </InfiniteScroll>
    </Box>
  )
  
}

export default RecipeList;