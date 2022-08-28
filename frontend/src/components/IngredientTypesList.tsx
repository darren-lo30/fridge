import { SimpleGrid } from "@chakra-ui/react";
import { IngredientType } from "@fridgeTypes/IngredientType";
import { clearIngredientTypes, extendIngredientTypes } from "@src/reducers/ingredientTypesReducer";
import { useAppDispatch, useAppSelector } from "@src/utils/hooks";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import FridgeScrollbar from "./FridgeScrollbar";
import FridgeSpinner from "./FridgeSpinner";
import IngredientTypeCard from "./IngredientTypeCard";

interface IngredientTypeListProps {
  selectIngredientType: (ingredientType: IngredientType) => void,
  search?: string,
}

const IngredientTypeList = ({ selectIngredientType, search} : IngredientTypeListProps) => {  
  const ingredientTypes = useAppSelector((state) => state.ingredientTypeData.ingredientTypes);
  const hasMore = useAppSelector((state) => state.ingredientTypeData.hasMoreIngredientTypes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearIngredientTypes());
    void getIngredientTypes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  
  // Functions
  const getIngredientTypes = async () => {
    await dispatch(extendIngredientTypes({ search }));
  }
  
  return (
    <FridgeScrollbar flex='1' flexBasis='0' overflow='auto' id="scrollbar" pr='3'>
    <InfiniteScroll scrollableTarget="scrollbar" style={{ overflow: 'hidden'}} hasMore={hasMore} next={getIngredientTypes} dataLength={ingredientTypes.length} loader={<FridgeSpinner />} >
      <SimpleGrid overflow='hidden' columns={{ sm: 1, md: 2, lg: 3}} gap='3' >
        {ingredientTypes.map((ingredientType) => (
          <IngredientTypeCard key={ingredientType.id} ingredientType={ingredientType} selectIngredientType={(ingredientType: IngredientType) => selectIngredientType(ingredientType)}/>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  </FridgeScrollbar>
  )
}

export default IngredientTypeList;