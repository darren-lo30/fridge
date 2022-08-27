import { Box, BoxProps, Heading } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import IngredientAPI from "src/apiLayer/IngredientAPI";
import {RootState} from "@src/store";
import { useDispatch, useSelector } from 'react-redux'
import { extendIngredients, clearIngredients, removeIngredient } from "@src/reducers/ingredientsReducer";
import FridgeScrollbar from "./FridgeScrollbar";
import { AnimatePresence, motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import FridgeSpinner from "./FridgeSpinner";
import IngredientPreview from "./IngredientList";

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

  const deleteIngredient = async (ingredientId: string) => {
    setHasMore(true);
    await IngredientAPI.deleteIngredient(ingredientId);
    dispatch(removeIngredient({ ingredientId }));
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

        
      <FridgeScrollbar
        pr='3'
        height='100%'
        overflow='auto'
      >
        <InfiniteScroll next={getIngredients} loader={<FridgeSpinner containerProps={{py: 2}} />} hasMore={hasMore} dataLength={ingredients.length}>
            { ingredients.map((ingredient) => (
              <AnimatePresence key={ingredient.id}>
                <Box 
                  key={ingredient.id} 
                  as={motion.div}
                  exit={{ opacity: 0 }}              
                >
                  <IngredientPreview ingredient={ingredient} deleteIngredient={deleteIngredient} />
                </Box>
              </AnimatePresence>
            ))}
        </InfiniteScroll>
      </FridgeScrollbar>
    </Box>
  );
}

export default FridgeDisplay;