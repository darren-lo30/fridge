import { Box, Heading,Flex, Text, Image, BoxProps} from "@chakra-ui/react"
import { Recipe } from "@fridgeTypes/Recipe";
import { FridgeLink} from "./FridgeButton";

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

export default RecipePreview;