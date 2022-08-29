import { SimpleGrid, Flex, Heading, Box } from "@chakra-ui/react"
import { FridgeButton } from "./FridgeButton"
import { IngredientTypeSelector } from "../IngredientTypeSelector"
import RecipeEditor from "../RichTextEditor"
import { Recipe } from "@fridgeTypes/Recipe";

interface RecipeEditFormProps {
  recipe: Recipe,
}

const RecipeEditForm = ({ recipe } : RecipeEditFormProps) => (
  <form style={{height: '100%'}}> 
    <SimpleGrid templateColumns={{base: '1fr', sm: '3fr 1fr' }} gap='5' height='100%' >
      <Flex flexDir='column' order={{base: 2, md: 1 }}>
        <Heading>Ingredients</Heading>
        <Heading mb='3'>Instructions</Heading>
        <Box flex='1' flexBasis='0'>
          <RecipeEditor />
        </Box>
        <FridgeButton mt='3' slidedirection='top'>Publish</FridgeButton>
      </Flex>
      <Flex flexDir={'column'} order={{base: 1, md: 2 }}>
        <Heading mb='2'>Selection</Heading>
        <IngredientTypeSelector indexType={"all"} gridProps={{columns: {sm: 1, md: 1, lg: 1}}}/>
      </Flex>
    </SimpleGrid>
  </form>
);

export default RecipeEditForm;