import IngredientAPI from "src/apiLayer/IngredientAPI";
import IngredientTypeAPI from "src/apiLayer/IngredientTypeAPI";
import { Box, Flex, FormControl, FormLabel, Grid, GridItem, Heading, Input, InputGroup, InputRightAddon, Select, SimpleGrid } from "@chakra-ui/react";
import { FridgeButton } from "@components/FridgeButton";
import FridgeDisplay from "@src/components/FridgeDisplay";
import FridgeScrollbar from "@components/FridgeScrollbar";
import FridgeSpinner from "@components/FridgeSpinner";
import { InputWithError } from "@components/InputWithError";
import { useUser } from "@contexts/UserProvider";
import { Ingredient } from "@fridgeTypes/Ingredient";
import { IngredientType } from "@fridgeTypes/IngredientType";
import { InferGetStaticPropsType } from "next";
import React, { useEffect, useState } from "react";
import { useForm } from "src/utils/forms";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { addNewIngredient } from "@src/reducers/ingredientsReducer";
import IngredientTypeCard from "@components/IngredientTypeCard";
import MeasurementUnitAPI from "@src/apiLayer/MeasurementUnitAPI";



interface AddIngredientFormProps {
  ingredientType: IngredientType,
  addIngredient: (ingredient: Ingredient) => void,
  measurementUnitOptions: string[],
}

interface AddIngredientFormData {
  amount: number,
  measurementUnits: string,
}

const AddIngredientForm = ({ ingredientType, addIngredient, measurementUnitOptions }: AddIngredientFormProps) => {
  const {
    handleSubmit,
    register,
    setError,
    reset,
  } = useForm<AddIngredientFormData>();
  const {user} = useUser();
  if(!user) throw new Error('Must log in');

  const [ selectedUnits, setSelectedUnits ] = useState('');
  useEffect(() => {
    setSelectedUnits(measurementUnitOptions[0] || '');

    return () => {
      reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientType]);

  const onSubmit = async (data: AddIngredientFormData) => {
    const { amount, measurementUnits } = data; 
    try {
      const ingredient = await IngredientAPI.createIngredient(user.fridgeId, ingredientType.id, amount, measurementUnits );
      addIngredient(ingredient);
      reset();
    } catch (e) {
      setError('formError', { message: 'Something went wrong' });
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading size='md' mb='5'>
          Adding {ingredientType.name}
        </Heading>
        <FormControl mb='3'>
          <Flex gap='2' alignItems={'end'}>
            <Box>
              <FormLabel>Units</FormLabel>
              <Select 
                isRequired={true}
                {...register('measurementUnits', {
                  onChange(event: React.FormEvent<HTMLInputElement>) {
                    setSelectedUnits(event.currentTarget.value)
                  },
                })
                }
              >
                {
                  measurementUnitOptions.map((measurementUnit) => (
                    <option key={measurementUnit} value={measurementUnit}>{ measurementUnit }</option>
                  ))
                }
              </Select>
            </Box>
            <InputGroup width='300px'>
              <InputWithError 
                type='number' 
                placeholder={'Amount'}
                isRequired={true}
                {...register('amount') }
              />
              <InputRightAddon>
                { selectedUnits }
              </InputRightAddon>
            </InputGroup>
          </Flex>
        </FormControl>
        <FridgeButton slidedirection="bottom" type='submit'>
          Add Ingredient
        </FridgeButton>
      </form>
    </Box>
  );
}

const Fridge = ({ allMeasurementUnits } : InferGetStaticPropsType<typeof getStaticProps>) => {
  // Hooks and State
  const { user } = useUser();
  const [ingredientTypes, setIngredientTypes] = useState<IngredientType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedIngredientType, setSelectedIngredientType] = useState<IngredientType | null>(null);

  const dispatch = useDispatch();
  
  // Functions
  const getIngredientTypes = async () => {
    const newIngredientTypes = await IngredientTypeAPI.indexTailoredIngredientTypes({
      limit: 8, 
      cursor: ingredientTypes.length > 0 ? ingredientTypes[ingredientTypes.length - 1].id : undefined,
      offset: ingredientTypes.length > 0 ? 1 : 0,
    })

    if(ingredientTypes.length <= 0) setHasMore(false);
    setIngredientTypes([...ingredientTypes, ...newIngredientTypes]);
  }

  const getIngredientMeasurementUnitOptions = (ingredientType: IngredientType) => {
    return allMeasurementUnits[ingredientType.measurementType];
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
          <Flex justifyContent={'space-between'} flexDirection={'row'} alignItems='start' width='100%'>
            <Heading size='lg' mb='5'>
              Add Ingredients
            </Heading>
            <Input placeholder='search' width='40%' rounded='full' borderColor='primary.500' borderWidth='2px' />
          </Flex> 
          <FridgeScrollbar flex='1' overflow='auto' id='3' flexBasis='0' pr='3'>
            <InfiniteScroll scrollableTarget='3' style={{ overflow: 'hidden'}} hasMore={hasMore} next={() => {console.log('xd')}} dataLength={ingredientTypes.length} loader={<FridgeSpinner />} >
              <SimpleGrid overflow={'hidden'} columns={2} minWidth='200px' gap='3' >
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
              measurementUnitOptions={getIngredientMeasurementUnitOptions(selectedIngredientType)} 
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
  const allMeasurementUnits = await MeasurementUnitAPI.indexMeasurementUnits();
  return {
    props: {
      allMeasurementUnits,
    }
  }
}

export default Fridge;
