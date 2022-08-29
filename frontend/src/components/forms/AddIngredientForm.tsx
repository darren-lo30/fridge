import IngredientAPI from "src/apiLayer/IngredientAPI";
import { Box, BoxProps, FormControl, Heading,  InputGroup, InputRightAddon, Select } from "@chakra-ui/react";
import { FridgeButton } from "@components/forms/FridgeButton";
import { InputWithError } from "@src/components/forms/InputWithError";
import { useUser } from "@contexts/UserProvider";
import { IngredientType } from "@fridgeTypes/IngredientType";
import { useForm } from "src/utils/forms";
import { useMeasurementUnit } from "@src/contexts/MeasurementUnitProvider";
import { getDisplayUnitOptions } from "@src/utils/fridge";
import { removeIngredientType } from "@src/reducers/ingredientTypesReducer";
import { addNewIngredient } from "@src/reducers/ingredientsReducer";
import { useAppDispatch } from "@src/utils/hooks";


interface AddIngredientFormProps extends BoxProps {
  parentId: string,
  parentType: 'fridge' | 'recipe',
  ingredientType: IngredientType | undefined,
  onSubmitCb?: () => void,
}

interface AddIngredientFormData {
  displayAmount: number,
  displayUnit: string,
}

const AddIngredientForm = ({ parentId, parentType, ingredientType, onSubmitCb }: AddIngredientFormProps) => {
  const {
    handleSubmit,
    register,
    setError,
    reset,
  } = useForm<AddIngredientFormData>();
  
  const { measurementUnitOptions } = useMeasurementUnit();
  const dispatch = useAppDispatch();

  if(ingredientType === undefined) {
    return (
      <Box>
        <Heading size='md'>No ingredient is currently selected...</Heading>
      </Box>
    )
  }

  // Get display unit options when creating the ingredient
  const displayUnitOptions = getDisplayUnitOptions(measurementUnitOptions, ingredientType);
  
  
  const onSubmit = async (data: AddIngredientFormData) => {
    const { displayAmount, displayUnit } = data; 
    try {
      let ingredient;
      if(parentType === 'fridge') {
        ingredient = await IngredientAPI.createFridgeIngredient(parentId, { ingredientTypeId: ingredientType.id, displayAmount, displayUnit });
      } else {
        ingredient = await IngredientAPI.createRecipeIngredient(parentId, { ingredientTypeId: ingredientType.id, displayAmount, displayUnit })
      }
      
      // Add ingredient to list of ingredients in fridge
      // Remove ingredient type from those available for user to pick from

      dispatch(addNewIngredient({ ingredient }));
      dispatch(removeIngredientType({ ingredientTypeId: ingredient.ingredientType.id }));  

      onSubmitCb && onSubmitCb();
  
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
        <InputGroup maxWidth='300px'>
          <InputWithError 
            type='number' 
            placeholder={'Amount'}
            isRequired={true}
            {...register('displayAmount') }
          />
          <InputRightAddon p='0'>
            <Select 
              minWidth='max-content'
              isRequired={true}
              {...register('displayUnit') }
            >
              {
                displayUnitOptions.map((measurementUnit) => (
                  <option key={measurementUnit} value={measurementUnit}>{ measurementUnit }</option>
                ))
              }
            </Select>
          </InputRightAddon>
        </InputGroup>
      </FormControl>
      <FridgeButton slidedirection="bottom" type='submit'>
        Add Ingredient
      </FridgeButton>
    </form>
  );
}

export default AddIngredientForm;