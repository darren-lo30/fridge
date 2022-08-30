import { Box, Heading, SimpleGrid, Image, SimpleGridProps, Flex } from "@chakra-ui/react";
import { IngredientType } from "@fridgeTypes/IngredientType";
import { clearIngredientTypes } from "@src/reducers/ingredientTypesReducer";
import { useAppDispatch, useAppSelector } from "@src/utils/hooks";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import IngredientDataForm from "./IngredientDataForm";
import { FridgeButton } from "./FridgeButton";
import { SearchBar } from "./SearchBar";
import FridgeScrollbar from "../ui/FridgeScrollbar";
import FridgeSpinner from "@components/ui/FridgeSpinner";
import { IngredientCreationData } from "@src/apiLayer/IngredientAPI";


interface IngredientTypeCardProps {
  ingredientType : IngredientType, 
  selectIngredientType: (ingredientType: IngredientType) => void,
}

const IngredientTypeCard = ({ ingredientType, selectIngredientType } : IngredientTypeCardProps) => {
  return (
    <Box roundedTop='5' key={ingredientType.id} bg='gray.50' overflow='hidden' boxShadow='sm' borderBottomColor='secondary.200' borderBottomWidth='3px' >
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

interface IngredientTypeListProps {
  gridProps?: SimpleGridProps,
  createIngredient: (data: IngredientCreationData) => void,
  getIngredientTypes: (search?: string) => void,
}

export const IngredientCreator = ({ getIngredientTypes, gridProps, createIngredient: createIngredientCb } : IngredientTypeListProps) => {  
  const ingredientTypes = useAppSelector((state) => state.ingredientTypeData.ingredientTypes);
  const hasMore = useAppSelector((state) => state.ingredientTypeData.hasMoreIngredientTypes);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');

  const [selectedIngredientType, setSelectedIngredientType] = useState<IngredientType>();


  const getIngredientTypesSearch = () => {
    getIngredientTypes(search);
  }
  
  const createIngredient = (data: IngredientCreationData) => {
    setSelectedIngredientType(undefined);
    createIngredientCb(data);
  }

  useEffect(() => {
    dispatch(clearIngredientTypes());
    void getIngredientTypesSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  
  return (
  <Flex order={{base: 1, sm: 2 }} flexDir='column' flex='1' minWidth='200px' height={{base: '1000px', sm: 'auto'}}>
    <SearchBar mb='3' value={search} onChange={(e) => setSearch(e.currentTarget.value)} ></SearchBar>
    <FridgeScrollbar flex='1' flexBasis='0' overflow='auto' id="scrollbar" pr='3'>
    <InfiniteScroll scrollableTarget="scrollbar" style={{ overflow: 'hidden'}} hasMore={hasMore} next={getIngredientTypesSearch} dataLength={ingredientTypes.length} loader={<FridgeSpinner />} >
      <SimpleGrid overflow='hidden' columns={{ sm: 1, md: 2, lg: 3}} gap='3' {...gridProps} >
        {ingredientTypes.map((ingredientType) => (
          <IngredientTypeCard key={ingredientType.id} ingredientType={ingredientType} selectIngredientType={(ingredientType: IngredientType) => setSelectedIngredientType(ingredientType)}/>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
    </FridgeScrollbar>
    <Box p='5' rounded='5' bg='gray.50' mt='5' minHeight='180px'>
      <IngredientDataForm ingredientType={selectedIngredientType} onSubmit={createIngredient} />
    </Box>
  </Flex>
    
  )
}

export default IngredientCreator;