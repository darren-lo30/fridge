import { Box, BoxProps, Heading } from "@chakra-ui/react";
import IngredientList from "./IngredientList";
import { useState, useEffect } from 'react';
import IngredientAPI from "src/apiLayer/IngredientAPI";
import {RootState} from "@src/store";
import { useDispatch, useSelector } from 'react-redux'
import { extendIngredients, clearIngredients } from "@src/reducers/ingredientsReducer";

interface FridgeDisplayProps extends BoxProps { fridgeId: string }

const FridgeDisplay = ({ fridgeId, ...props } : FridgeDisplayProps) => {
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const ingredients = useSelector((state: RootState) => state.ingredients);
  
  const getIngredients = async () => {
    const newIngredients = await IngredientAPI.indexFridgeIngredients(
      fridgeId,
      { limit: 16, 
        cursor: ingredients.length > 0 ? ingredients[ingredients.length - 1].id : undefined,
        offset: ingredients.length > 0 ? 1 : 0,
    });
    
    if(newIngredients.length === 0) { 
      setHasMore(false); 
    }
    
    dispatch(extendIngredients({ ingredients: newIngredients }));
  }

  useEffect(() => {
    dispatch(clearIngredients());
    void getIngredients();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Box {...props}>
      <Heading size='lg' mb='5'>
        Your Fridge
      </Heading>

      <IngredientList ingredients={ingredients} hasMore={hasMore} getIngredients={getIngredients} />
    </Box>
  );
}

export default FridgeDisplay;