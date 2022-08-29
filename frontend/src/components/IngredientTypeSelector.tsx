import { Box, Heading, SimpleGrid, Image, SimpleGridProps, Flex } from "@chakra-ui/react";
import { IngredientType } from "@fridgeTypes/IngredientType";
import { clearIngredientTypes, extendIngredientTypes, ExtendIngredientTypesPayload } from "@src/reducers/ingredientTypesReducer";
import { useAppDispatch, useAppSelector } from "@src/utils/hooks";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AddIngredientForm from "./forms/AddIngredientForm";
import { FridgeButton } from "./forms/FridgeButton";
import { SearchBar } from "./forms/SearchBar";
import FridgeScrollbar from "./FridgeScrollbar";
import FridgeSpinner from "./FridgeSpinner";

interface IngredientTypeListProps {
  indexType: ExtendIngredientTypesPayload['indexType'],
  gridProps?: SimpleGridProps
}

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


export const IngredientTypeSelector = ({ indexType, gridProps } : IngredientTypeListProps) => {  
  const ingredientTypes = useAppSelector((state) => state.ingredientTypeData.ingredientTypes);
  const hasMore = useAppSelector((state) => state.ingredientTypeData.hasMoreIngredientTypes);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');

  const [selectedIngredientType, setSelectedIngredientType] = useState<IngredientType>();
  const getIngredientTypes = async () => {
    await dispatch(extendIngredientTypes({ indexType, search }));
  } 


  useEffect(() => {
    dispatch(clearIngredientTypes());
    void getIngredientTypes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  
  
  return (
  <Flex order={{base: 1, sm: 2 }} flexDir='column' flex='1' minWidth='200px' height={{base: '1000px', sm: 'auto'}}>
    <SearchBar mb='3' value={search} onChange={(e) => setSearch(e.currentTarget.value)} ></SearchBar>
    <FridgeScrollbar flex='1' flexBasis='0' overflow='auto' id="scrollbar" pr='3'>
    <InfiniteScroll scrollableTarget="scrollbar" style={{ overflow: 'hidden'}} hasMore={hasMore} next={getIngredientTypes} dataLength={ingredientTypes.length} loader={<FridgeSpinner />} >
      <SimpleGrid overflow='hidden' columns={{ sm: 1, md: 2, lg: 3}} gap='3' {...gridProps} >
        {ingredientTypes.map((ingredientType) => (
          <IngredientTypeCard key={ingredientType.id} ingredientType={ingredientType} selectIngredientType={(ingredientType: IngredientType) => setSelectedIngredientType(ingredientType)}/>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
    </FridgeScrollbar>
    <Box p='3' rounded='5' bg='gray.50' mt='5' minHeight='180px'>
      <AddIngredientForm parentId={''} parentType='recipe' ingredientType={selectedIngredientType} />
    </Box>
  </Flex>
    
  )
}

export default IngredientTypeSelector;