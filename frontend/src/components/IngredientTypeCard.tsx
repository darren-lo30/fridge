import { Box, Heading, Image } from "@chakra-ui/react";
import { IngredientType } from "@fridgeTypes/IngredientType";
import { FridgeButton } from "./forms/FridgeButton";

interface IngredientTypeCardProps {
  ingredientType : IngredientType, 
  selectIngredientType: (ingredientType: IngredientType) => void,
}

const IngredientTypeCard = ({ ingredientType, selectIngredientType } : IngredientTypeCardProps) => {
  return (
    <Box rounded='5' key={ingredientType.id} bg='secondary.100' overflow='hidden'>
      <Image src={ingredientType.imageUrl || '/placeholder.svg'} alt={`Image of ${ingredientType.name}`} />
      <Box p='5'>
        <Heading size='md'>
          {ingredientType.name}
        </Heading>
        <FridgeButton mt='5' size='sm' onClick={() => { selectIngredientType(ingredientType)}}>Select Ingredient</FridgeButton>
      </Box>
    </Box>
  );
}

export default IngredientTypeCard;