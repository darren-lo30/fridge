import { Box } from "@chakra-ui/react";
import Ingredient from "@fridgeTypes/Ingredient";

const IngredientList = ({ ingredients } : {ingredients: Ingredient[]}) => {
  <Box>
    { ingredients.map((ingredient) => {
      <Box>
        
      </Box>
    })}
  </Box>
}

export default IngredientList;