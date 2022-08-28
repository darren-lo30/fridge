import { Box, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import FridgeDisplay from "@components/FridgeDisplay";
import { useUser } from "@contexts/UserProvider";
import { IngredientType } from "@fridgeTypes/IngredientType";
import { NextPage } from "next";
import React, { useState } from "react";
import AddIngredientForm from "@components/forms/AddIngredientForm";
import IngredientTypeList from "@src/components/IngredientTypesList";
import { SearchBar } from "@src/components/forms/SearchBar";

const Fridge : NextPage = () => {
  // Hooks and State
  const { user } = useUser();
  const [search, setSearch] = useState('');
  const [selectedIngredientType, setSelectedIngredientType] = useState<IngredientType | null>(null);

  if(!user) {
    throw new Error("Please sign out and sign in again.");
  }

  return (
    <Box flex='1'>
       <Grid flex='1' templateColumns='minmax(250px, 1fr) 2fr' templateRows='3fr 1fr' w='100%' height='100%' gap='5'>
        <GridItem p='5' bg='gray.50' rounded='5' height='100%' rowSpan={2} boxShadow='sm'>
          <Box>
            <FridgeDisplay height='100%' fridgeId={user.fridgeId} />
          </Box>
        </GridItem>
        <GridItem p='5' rounded='5' display='flex' flexDir='column'>
          <Flex justifyContent={'space-between'} flexDirection={{sm: 'column', md: 'row'}} alignItems='start' width='100%' mb='5'>
            <Heading size='lg' mb='2'>
              Add Ingredients
            </Heading>
            <SearchBar 
              width={{sm: '100%', md: '40%'}} 
              value={search} onChange={(e) => setSearch(e.currentTarget.value)} 
            />
          </Flex> 

          <IngredientTypeList search={search} selectIngredientType={(ingredientType) => {setSelectedIngredientType(ingredientType)}}/>
        </GridItem>
        <GridItem p='5' rounded='5' bg='gray.50' boxShadow='md'>
          { selectedIngredientType ? (
            <AddIngredientForm 
              ingredientType={selectedIngredientType} 
              onSubmitCb={() => setSelectedIngredientType(null)}
            />
          ) : (
            <Box>
              <Heading size='md'>No ingredient is currently selected...</Heading>
            </Box>
          )}
        </GridItem>
      </Grid>
    </Box>
  )
}


export default Fridge;
