import IngredientAPI from "src/apiLayer/IngredientAPI";
import { Box, Flex, FormControl, FormLabel, Heading,  InputGroup, InputRightAddon, Select } from "@chakra-ui/react";
import { FridgeButton } from "@components/forms/FridgeButton";
import { InputWithError } from "@src/components/forms/InputWithError";
import { useUser } from "@contexts/UserProvider";
import { Ingredient } from "@fridgeTypes/Ingredient";
import { IngredientType } from "@fridgeTypes/IngredientType";
import React, { useEffect, useState } from "react";
import { useForm } from "src/utils/forms";


interface AddIngredientFormProps {
  ingredientType: IngredientType,
  addIngredient: (ingredient: Ingredient) => void,
  displayUnitOptions: string[],
}

interface AddIngredientFormData {
  displayAmount: number,
  displayUnit: string,
}

const AddIngredientForm = ({ ingredientType, addIngredient, displayUnitOptions }: AddIngredientFormProps) => {
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
    setSelectedUnits(displayUnitOptions[0] || '');

    return () => {
      reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientType]);

  const onSubmit = async (data: AddIngredientFormData) => {
    const { displayAmount, displayUnit } = data; 
    try {
      const ingredient = await IngredientAPI.createIngredient(user.fridgeId, ingredientType.id, displayAmount, displayUnit );
      addIngredient(ingredient);
      reset();
    } catch (e) {
      setError('formError', { message: 'Something went wrong' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading size='md' mb='5'>
        Adding {ingredientType.name}
      </Heading>
      <FormControl mb='3'>
        <Flex gap='2' alignItems={'end'}>
          <Box>
            <FormLabel>Units</FormLabel>
            <Select 
              minWidth='max-content'
              isRequired={true}
              {...register('displayUnit', {
                onChange(event: React.FormEvent<HTMLInputElement>) {
                  setSelectedUnits(event.currentTarget.value)
                },
              })
              }
            >
              {
                displayUnitOptions.map((measurementUnit) => (
                  <option key={measurementUnit} value={measurementUnit}>{ measurementUnit }</option>
                ))
              }
            </Select>
          </Box>
          <InputGroup maxWidth='300px'>
            <InputWithError 
              type='number' 
              placeholder={'Amount'}
              isRequired={true}
              {...register('displayAmount') }
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
  );
}

export default AddIngredientForm;