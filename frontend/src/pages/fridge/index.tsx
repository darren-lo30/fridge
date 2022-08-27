import IngredientTypeAPI from "src/apiLayer/IngredientTypeAPI";
import { Box, Flex, Grid, GridItem, Heading, Input, SimpleGrid } from "@chakra-ui/react";
import FridgeDisplay from "@components/FridgeDisplay";
import FridgeScrollbar from "@components/FridgeScrollbar";
import FridgeSpinner from "@components/FridgeSpinner";
import { useUser } from "@contexts/UserProvider";
import { Ingredient } from "@fridgeTypes/Ingredient";
import { IngredientType } from "@fridgeTypes/IngredientType";
import { InferGetStaticPropsType } from "next";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { addNewIngredient } from "@src/reducers/ingredientsReducer";
import IngredientTypeCard from "@components/IngredientTypeCard";
import MeasurementUnitAPI from "@src/apiLayer/MeasurementUnitAPI";
import AddIngredientForm from "@components/forms/AddIngredientForm";




const Fridge = ({ allDisplayUnitOptions } : InferGetStaticPropsType<typeof getStaticProps>) => {
  // Hooks and State
  const { user } = useUser();
  const [ingredientTypes, setIngredientTypes] = useState<IngredientType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedIngredientType, setSelectedIngredientType] = useState<IngredientType | null>(null);

  const dispatch = useDispatch();
  
  // Functions
  const getIngredientTypes = async () => {
    const newIngredientTypes = await IngredientTypeAPI.indexTailoredIngredientTypes({
      limit: 6,
      cursor: ingredientTypes.length > 0 ? ingredientTypes[ingredientTypes.length - 1].id : undefined,
      offset: ingredientTypes.length > 0 ? 1 : 0,
    })
    console.log(newIngredientTypes);
    console.log(hasMore);
    if(newIngredientTypes.length <= 0) setHasMore(false);
    setIngredientTypes([...ingredientTypes, ...newIngredientTypes]);
  }

  const getIngredientTypeDisplayUnitOptions = (ingredientType: IngredientType) => {
    return allDisplayUnitOptions[ingredientType.measurementType];
  }

  const addIngredient = (ingredient: Ingredient) => {
    dispatch(addNewIngredient({ ingredient }));
  }

  useEffect(() => {
    void getIngredientTypes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
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
            <Input placeholder='search' width={{sm: '100%', md: '40%'}} rounded='full' borderColor='primary.500' borderWidth='2px' />
          </Flex> 

          {/* Ingredient List */}
          <FridgeScrollbar flex='1' flexBasis='0' overflow='auto' id="scrollbar" pr='3'>
            <InfiniteScroll scrollableTarget="scrollbar" style={{ overflow: 'hidden'}} hasMore={hasMore} next={getIngredientTypes} dataLength={ingredientTypes.length} loader={<FridgeSpinner />} >
              <SimpleGrid overflow='hidden' columns={{ sm: 1, md: 2, lg: 3}} gap='3' >
                {ingredientTypes.map((ingredientType) => (
                  <IngredientTypeCard key={ingredientType.id} ingredientType={ingredientType} selectIngredientType={(ingredientType: IngredientType) => setSelectedIngredientType(ingredientType)}/>
                ))}
              </SimpleGrid>
            </InfiniteScroll>
          </FridgeScrollbar>
        </GridItem>
        <GridItem p='5' rounded='5' bg='gray.50' boxShadow='md'>
          { selectedIngredientType ? (
            <AddIngredientForm 
              ingredientType={selectedIngredientType} 
              addIngredient={addIngredient} 
              displayUnitOptions={getIngredientTypeDisplayUnitOptions(selectedIngredientType)} 
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

export async function getStaticProps() {
  const allDisplayUnitOptions = await MeasurementUnitAPI.indexMeasurementUnits();
  return {
    props: {
      allDisplayUnitOptions,
    }
  }
}

export default Fridge;
