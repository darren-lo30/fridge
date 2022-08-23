import { Flex, Box, Text, Stack, Image } from "@chakra-ui/react";
import InfiniteScroll from 'react-infinite-scroll-component';
import {Ingredient} from "@fridgeTypes/Ingredient";
import { useEffect, useState } from "react";
import IngredientAPI from "@apiLayer/IngredientsAPI";
import FridgeSpinner from "./FridgeSpinner";
const IngredientPreview = ({ ingredient } : { ingredient : Ingredient }) => {
  return (
    <Flex flexDirection='row' py='3' px='2' alignItems={'center'} borderTopWidth='2px' borderColor={'primary.main'}>
      <Image
        boxSize='50px'
        objectFit='cover'
        borderRadius='full'
        src='https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc='
        alt='Dan Abramov'
      />
      <Box ml='5'>
        <Text fontSize={'sm'} fontWeight='bold'>
          { ingredient.ingredientType.name }
        </Text>
        <Text fontSize={'xs'}>
          { '5g' }
        </Text>
      </Box>
    </Flex>
  );
}

const IngredientList = ({fridgeId} : { fridgeId: string}) => {
  const [ ingredients, setIngredients ] = useState<Ingredient[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const getIngredients = async () => {
  
    const newIngredients = await IngredientAPI.indexFridgeIngredients(
      fridgeId,
      { limit: 8, 
        cursor: ingredients.length > 0 ? ingredients[ingredients.length - 1].id : undefined,
        offset: ingredients.length > 0 ? 1 : 0,
      });
    
    if(newIngredients.length === 0) { 
      setHasMore(false); 
    }

    setIngredients([ ...ingredients, ...newIngredients ]);
  }

  useEffect(() => {
    void getIngredients();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Box
      height='100%'
      overflow='auto'
      __css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'secondary.main',
          borderRadius: '24px',
        },
      }}
      pr='3'
      >
      <InfiniteScroll next={getIngredients} loader={<FridgeSpinner containerProps={{py: 2}} />} hasMore={hasMore} dataLength={ingredients.length}>
        { ingredients.map((ingredient) => (
          <IngredientPreview key={ingredient.id} ingredient={ingredient} />
        ))}
      </InfiniteScroll>
    </Box>
  );
}

export default IngredientList;
