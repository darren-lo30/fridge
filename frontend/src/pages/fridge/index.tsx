import { Box, Grid, GridItem } from "@chakra-ui/react";
import FridgeDisplay from "@components/FridgeDisplay";
import { useUser } from "@contexts/UserProvider";
import { NextPage } from "next";
import React from "react";
import IngredientTypeSelector from "@src/components/IngredientTypeSelector";

const Fridge : NextPage = () => {
  const { user } = useUser();

  if(!user) {
    throw new Error("Please sign out and sign in again.");
  }

  return (
    <Box flex='1'>
       <Grid flex='1' templateColumns='minmax(250px, 1fr) 2fr' w='100%' height='100%' gap='5'>
        <GridItem p='5' bg='gray.50' rounded='5' height='100%' rowSpan={2} boxShadow='sm'>
          <Box>
            <FridgeDisplay height='100%' fridgeId={user.fridgeId} />
          </Box>
        </GridItem>
        <IngredientTypeSelector indexType='tailored' />
      </Grid>
    </Box>
  )
}


export default Fridge;
