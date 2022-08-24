import { Box, Heading } from "@chakra-ui/react";
import { IngredientType } from "@fridgeTypes/IngredientType";
import { FridgeButton } from "./FridgeButton";

interface IngredientTypeCardProps {
  ingredientType : IngredientType, 
  selectIngredientType: (ingredientType: IngredientType) => void,
}

const IngredientTypeCard = ({ ingredientType, selectIngredientType } : IngredientTypeCardProps) => {
  return (
    <Box p='5' rounded='5' key={ingredientType.id} bg='secondary.100'>
      <Heading size='md'>
        {ingredientType.name}
      </Heading>
      <FridgeButton mt='5' size='sm' onClick={() => { selectIngredientType(ingredientType)}}>Select Ingredient</FridgeButton>
    </Box>
  );
}

export default IngredientTypeCard;