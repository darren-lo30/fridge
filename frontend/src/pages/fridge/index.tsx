import { Box, Grid, GridItem } from "@chakra-ui/react";
import FridgeDisplay from "@components/FridgeDisplay";
import { useUser } from "@contexts/UserProvider";
import { NextPage } from "next";
import React from "react";
import IngredientCreator from "@components/forms/IngredientCreator";
import IngredientAPI from "@src/apiLayer/IngredientAPI";
import { IngredientDataFormData } from "@src/components/forms/IngredientDataForm";
import { addIngredientStart } from "@src/reducers/ingredientsReducer";
import { extendIngredientTypes, removeIngredientType } from "@src/reducers/ingredientTypesReducer";
import { useAppDispatch } from "@src/utils/hooks";

const Fridge : NextPage = () => {
  const { user } = useUser();

  if(!user) {
    throw new Error("Please sign out and sign in again.");
  }

  const dispatch = useAppDispatch();
  
  const createFridgeIngredient = async (data: IngredientDataFormData) => {
    const ingredient = await IngredientAPI.createFridgeIngredient(user.fridgeId, data);
    
    // Add ingredient to list of ingredients in fridge
    // Remove ingredient type from those available for user to pick from

    dispatch(addIngredientStart({ ingredient }));
    dispatch(removeIngredientType({ ingredientTypeId: data.ingredientTypeId }));  
  }

  const getIngredientTypes = async (search?: string) => {
    await dispatch(extendIngredientTypes({ indexType: 'tailored', search, limit: 9}));
  }

  return (
    <Box flex='1'>
       <Grid flex='1' templateColumns={{base: '1fr', sm: 'minmax(250px, 1fr) 2fr'}} w='100%' height='100%' gap='5'>
        <GridItem p='5' bg='gray.50' rounded='5' height='100%' boxShadow='sm'>
          <Box>
            <FridgeDisplay height='100%' fridgeId={user.fridgeId} />
          </Box>
        </GridItem>
        <IngredientCreator getIngredientTypes={getIngredientTypes} createIngredient={createFridgeIngredient} />
      </Grid>
    </Box>
  )
}


export default Fridge;
