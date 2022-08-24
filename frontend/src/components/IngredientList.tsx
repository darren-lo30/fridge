import { Flex, Box, Text, Image } from "@chakra-ui/react";
import InfiniteScroll from 'react-infinite-scroll-component';
import {Ingredient} from "@fridgeTypes/Ingredient";
import FridgeSpinner from "./FridgeSpinner";
import FridgeScrollbar from "./FridgeScrollbar";
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
          { `${ingredient.amount}` }
        </Text>
      </Box>
    </Flex>
  );
}

const IngredientList = ({ ingredients, getIngredients, hasMore } : {ingredients : Ingredient[], getIngredients: () => void, hasMore : boolean }) => {
  return (
    <FridgeScrollbar
      pr='3'
      height='100%'
      overflow='auto'
    >
      <InfiniteScroll next={getIngredients} loader={<FridgeSpinner containerProps={{py: 2}} />} hasMore={hasMore} dataLength={ingredients.length}>
        { ingredients.map((ingredient) => (
          <IngredientPreview key={ingredient.id} ingredient={ingredient} />
        ))}
      </InfiniteScroll>
    </FridgeScrollbar>
  );
}

export default IngredientList;
