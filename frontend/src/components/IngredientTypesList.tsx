import { SimpleGrid } from "@chakra-ui/react";
import { IngredientType } from "@fridgeTypes/IngredientType";
import IngredientTypeAPI from "@src/apiLayer/IngredientTypeAPI";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import FridgeScrollbar from "./FridgeScrollbar";
import FridgeSpinner from "./FridgeSpinner";
import IngredientTypeCard from "./IngredientTypeCard";

interface IngredientTypeListProps {
  selectIngredientType: (ingredientType: IngredientType) => void,
}

const IngredientTypeList = ({ selectIngredientType } : IngredientTypeListProps) => {
  const [ingredientTypes, setIngredientTypes] = useState<IngredientType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  
  useEffect(() => {
    void getIngredientTypes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Functions
  const getIngredientTypes = async () => {
    const newIngredientTypes = await IngredientTypeAPI.indexTailoredIngredientTypes({
      limit: 6,
      cursor: ingredientTypes.length > 0 ? ingredientTypes[ingredientTypes.length - 1].id : undefined,
      offset: ingredientTypes.length > 0 ? 1 : 0,
    })
    
    if(newIngredientTypes.length <= 0) setHasMore(false);
    setIngredientTypes([...ingredientTypes, ...newIngredientTypes]);
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