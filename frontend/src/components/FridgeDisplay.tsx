import { Box, BoxProps, Heading } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { extendFridgeIngredients, clearIngredients } from "@src/reducers/ingredientsReducer";
import FridgeScrollbar from "./ui/FridgeScrollbar";
import { AnimatePresence, motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import FridgeSpinner from "./ui/FridgeSpinner";
import IngredientPreview from "./IngredientPreview";
import { useAppDispatch, useAppSelector } from "@src/utils/hooks";
import { SearchBar } from "./forms/SearchBar";
import { Ingredient } from "@fridgeTypes/Ingredient";
import { addIngredientTypeStart } from "@src/reducers/ingredientTypesReducer";

interface FridgeDisplayProps extends BoxProps { fridgeId: string }

const FridgeDisplay = ({ fridgeId, ...props } : FridgeDisplayProps) => {
  const dispatch = useAppDispatch();
  const hasMore = useAppSelector((state) => state.ingredientData.hasMoreIngredients);
  const ingredients = useAppSelector((state) => state.ingredientData.ingredients);
  const [ search, setSearch ] = useState('');

  const getIngredients = async () => {    
    await dispatch(extendFridgeIngredients({ fridgeId, search }));
  }

  const ingredientDeleteCb = (deletedIngredient: Ingredient) => {
    dispatch(addIngredientTypeStart({ ingredientType: deletedIngredient.ingredientType }));
  }


  useEffect(() => {
    dispatch(clearIngredients());
    void getIngredients();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  
  return (
    <Box {...props}>
      <Heading size='lg' mb='5'>
        Your Fridge
      </Heading>
      <SearchBar 
        mb ='3' 
        width='100%' 
        value={search} 
        onChange={(e) => setSearch(e.currentTarget.value)} 
      />

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
                  <IngredientPreview ingredient={ingredient} isEditable={true} onDeleteCb={ingredientDeleteCb} />
                </Box>
              </AnimatePresence>
            ))}
        </InfiniteScroll>
      </FridgeScrollbar>
    </Box>
  );
}

export default FridgeDisplay;